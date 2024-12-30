import { ChainAddress } from '@/app/types/chainAddress';
import { Edge } from 'reactflow';


type FundsFlowData = {
    readonly isLoading?: boolean;
    readonly nodes: Node[];
    readonly edges: Edge[];
}

export const useFundsFlow = (sourceAddress: ChainAddress): FundsFlowData => {
    // const graph = getGroupLayout(nodes, edges, 'LR');

    // return {
    //     isLoading,
    //     funds,
    //     nodes: graph.nodes,
    //     edges,
    // };
};
