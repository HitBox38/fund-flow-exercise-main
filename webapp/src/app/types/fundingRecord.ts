import { ChainAddress, ChainIds } from '@/app/types/chainAddress';


export interface FundingRecord {
    readonly id: number;
    readonly txHash?: string;
    readonly chainId: ChainIds;
    readonly sourceAddress: string;
    readonly destinationAddress: string;
}

export interface FundingFlowRecord {
    source: ChainAddress;
    dest: ChainAddress;
}

export interface FundingResData {
    edges: FundingFlowRecord[];
}
