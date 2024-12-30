export enum ChainIds {
    EthereumMainnet = 1,
}

export enum AddressType {
    CONTRACT = 'Contract',
    EOA = 'EOA',
    UNKNOWN = 'Unknown',
}


export type ChainAddress = {
    readonly address: string;
    readonly chainId: ChainIds;
    readonly type: AddressType;
    readonly name?: string;
};
