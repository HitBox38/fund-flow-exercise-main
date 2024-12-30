import { NodeProps } from 'reactflow';
import { FC } from 'react';
import { ChainAddress } from '@/app/types/ChainAddress';

interface AddressNodeData extends ChainAddress {
    readonly isSource?: boolean;
}

export const FundNode: FC<NodeProps<AddressNodeData>> = node => {
    const { data } = node;

};
