import { getFundingGraph } from "@/app/api/funding";
import { EDGES_TYPES, NODE_TYPES } from "@/app/components/charts";
import { ChainAddress } from "@/app/types/chainAddress";
import { getGroupLayout } from "@/app/utils/getGroupLayout";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Edge, MarkerType, Node } from "reactflow";

type FundsFlowData = {
  readonly isLoading?: boolean;
  readonly nodes: Node[];
  readonly edges: Edge[];
};

export const useFundsFlow = (sourceAddress: ChainAddress): FundsFlowData => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [visited, setVisited] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();

  const updateNodes = useCallback((prev: Node[], newNodes: any[]) => {
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

  const updateEdges = useCallback((prev: Edge[], newEdges: any[]) => {
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
    },
    [queryClient, updateEdges, updateNodes]
  );

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await fetchConnections(sourceAddress, visited);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchConnections, sourceAddress]);

  const graph = useMemo(() => getGroupLayout(nodes, edges, "LR"), [nodes, edges]);

  return { isLoading, nodes: graph.nodes, edges };
};
