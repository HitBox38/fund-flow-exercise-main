import { memo, useEffect, useMemo } from "react";
import {
  Edge,
  FitViewOptions,
  Node,
  OnEdgesChange,
  OnNodesChange,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "reactflow";
import { customEdges, nodeTypes } from "@/app/components/charts/FlowChart.constants";

const fitViewOptions: FitViewOptions = {
  padding: 0.3,
};

type FlowChartProps = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  className?: string;
  preventScrolling?: boolean;
  children?: JSX.Element | JSX.Element[];
};

const FlowChart = ({ nodes, edges, className, children }: FlowChartProps) => {
  const initialNodes = useMemo(() => nodes, [nodes]);
  const initialEdges = useMemo(() => edges, [edges]);

  const [nodesState, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edgesState, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const memoizedNodeTypes = useMemo(() => nodeTypes, []);
  const memoizedEdgeTypes = useMemo(() => customEdges, []);

  const defaultEdgeOptions = useMemo(() => ({ zIndex: 0 }), []);

  useEffect(() => {
    setNodes(nodes);
  }, [nodes, setNodes]);

  useEffect(() => {
    setEdges(edges);
  }, [edges, setEdges]);

  return (
    <ReactFlow
      nodes={nodesState}
      edges={edgesState}
      fitView
      fitViewOptions={fitViewOptions}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={memoizedNodeTypes}
      edgeTypes={memoizedEdgeTypes}
      className={className}
      defaultEdgeOptions={defaultEdgeOptions}>
      {children}
    </ReactFlow>
  );
};

export default memo(FlowChart);
