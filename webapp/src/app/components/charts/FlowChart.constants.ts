import { FundEdge } from '@/app/components/charts/FundEdge';
import { FundNode } from '@/app/components/charts/FundNode';


export const NODE_TYPES = {
    FUND_NODE: 'fundNode',
};

export const EDGES_TYPES = {
    FUND_EDGE: 'fundEdge',
};

export const nodeTypes = {
    [NODE_TYPES.FUND_NODE]: FundNode,
};

export const customEdges = {
    [EDGES_TYPES.FUND_EDGE]: FundEdge,
};
