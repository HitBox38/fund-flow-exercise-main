import React, { FC, memo } from 'react';
import {
    Edge,
    FitViewOptions,
    Node,
    OnEdgesChange,
    OnNodesChange,
    ReactFlow,
    useEdgesState,
    useNodesState,
} from 'reactflow';
import { customEdges, nodeTypes } from '@/app/components/charts/FlowChart.constants';


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

const FlowChart: FC<FlowChartProps> = ({
                                           nodes,
                                           edges,
                                           className,
                                           children,
                                       }) => {
    const [nodesState, setNodes, onNodesChange] = useNodesState(nodes);
    const [edgesState, setEdges, onEdgesChange] = useEdgesState(edges);


    return (
        <ReactFlow
            nodes={nodesState}
            edges={edgesState}
            fitView
            fitViewOptions={fitViewOptions}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            edgeTypes={customEdges}
            className={className}
            defaultEdgeOptions={{ zIndex: 0 }}
        >
            {children}
        </ReactFlow>
    );
};

export default memo(FlowChart);
