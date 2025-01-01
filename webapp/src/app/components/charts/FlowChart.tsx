import { memo, useCallback, useEffect, useMemo } from "react";
import {
  Edge,
  FitViewOptions,
  Node,
  OnEdgesChange,
  OnNodesChange,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "reactflow";
import { customEdges, nodeTypes } from "@/app/components/charts/FlowChart.constants";

const fitViewOptions: FitViewOptions = {
  padding: 0.3,
  duration: 200,
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
  const { fitView } = useReactFlow();

  const memoizedNodeTypes = useMemo(() => nodeTypes, []);
  const memoizedEdgeTypes = useMemo(() => customEdges, []);

  const defaultEdgeOptions = useMemo(() => ({ zIndex: 0 }), []);

  const fitViewOnUpdate = useCallback(() => {
    // Small delay to ensure nodes are properly rendered
    setTimeout(() => {
      fitView(fitViewOptions);
    }, 100);
  }, [fitView]);

  useEffect(() => {
    setNodes(nodes);
    fitViewOnUpdate();
  }, [nodes, setNodes, fitViewOnUpdate]);

  useEffect(() => {
    setEdges(edges);
    fitViewOnUpdate();
  }, [edges, setEdges, fitViewOnUpdate]);

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
      defaultEdgeOptions={defaultEdgeOptions}
      onLoadedData={fitViewOnUpdate}>
      {children}
    </ReactFlow>
  );
};

export default memo(FlowChart);
