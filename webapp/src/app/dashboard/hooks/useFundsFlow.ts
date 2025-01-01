import { getFundingGraph } from "@/app/api/funding";
import { EDGES_TYPES, NODE_TYPES } from "@/app/components/charts";
import { AddressType, ChainAddress } from "@/app/types/chainAddress";
import { getGroupLayout } from "@/app/utils/getGroupLayout";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Edge, MarkerType, Node } from "reactflow";

type FundsFlowData = {
  readonly isLoading?: boolean;
  readonly error?: unknown;
  readonly nodes: Node[];
  readonly edges: Edge[];
};

interface NewEdge {
  from: string;
  to: string;
}

interface NewNode {
  id: string;
  data: {
    name: string | undefined;
    address: string;
  };
  type: AddressType;
}

export const useFundsFlow = (sourceAddresses: ChainAddress[]): FundsFlowData => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [visited, setVisited] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown | null>(null);

  const queryClient = useQueryClient();

  const updateNodes = useCallback((prev: Node[], newNodes: NewNode[]) => {
    const uniqueNodes = new Map(prev.map((node) => [node.id, node]));
    newNodes.forEach((node) =>
      uniqueNodes.set(node.id, {
        ...node,
        position: { x: 0, y: 0 },
        type: NODE_TYPES.FUND_NODE,
      })
    );
    return Array.from(uniqueNodes.values());
  }, []);

  const updateEdges = useCallback((prev: Edge[], newEdges: NewEdge[]) => {
    const uniqueEdges = new Set(prev.map((edge) => `${edge.source}-${edge.target}`));
    newEdges.forEach((edge) => uniqueEdges.add(`${edge.from}-${edge.to}`));
    return Array.from(uniqueEdges).map((key) => {
      const [source, target] = key.split("-");
      return {
        source,
        target,
        id: key,
        type: EDGES_TYPES.FUND_EDGE,
        style: {
          stroke: "#bfdbfe",
          strokeWidth: 2,
          strokeOpacity: 1,
        },
        markerEnd: {
          type: MarkerType.Arrow,
          color: "#bfdbfe",
        },
      };
    });
  }, []);

  const fetchConnections = useCallback(
    async (address: ChainAddress, localVisited: Set<string>) => {
      try {
        if (localVisited.has(address.address)) return;

        localVisited.add(address.address);
        setVisited(new Set(localVisited));

        const data = await queryClient.fetchQuery({
          queryKey: ["fundingGraph", address],
          queryFn: () => getFundingGraph(address),
        });

        const newNodes = data.edges
          .flatMap((edge) => [edge.source, edge.dest])
          .map((addr) => ({
            id: addr.address,
            data: { name: addr.name, address: addr.address },
            type: addr.type,
          }));

        const newEdges = data.edges.map((edge) => ({
          from: edge.source.address,
          to: edge.dest.address,
        }));

        setNodes((prev) => updateNodes(prev, newNodes));
        setEdges((prev) => updateEdges(prev, newEdges));

        await Promise.all(
          data.edges
            .map((edge) => edge.dest)
            .filter((dest) => !localVisited.has(dest.address))
            .map((dest) => fetchConnections(dest, localVisited))
        );
      } catch (e) {
        console.error(e);
        setError(e);
      }
    },
    [queryClient, updateEdges, updateNodes]
  );

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        console.time(`fetchConnections`);
        console.log(isLoading);

        sourceAddresses.forEach((source) => fetchConnections(source, visited));
      } catch (e) {
        console.error(e);
        setError(e);
      } finally {
        setIsLoading(false);
        console.timeEnd("fetchConnections");
        console.log(isLoading);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchConnections, sourceAddresses]);

  const graph = useMemo(() => getGroupLayout(nodes, edges, "LR"), [nodes, edges]);

  return { isLoading, error, nodes: graph.nodes, edges };
};
