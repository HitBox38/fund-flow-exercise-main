import { Handle, NodeProps, Position } from "reactflow";
import { FC } from "react";
import { ChainAddress } from "@/app/types/chainAddress";
import clsx from "clsx";

interface AddressNodeData extends ChainAddress {
  readonly isSource?: boolean;
}

export const FundNode: FC<NodeProps<AddressNodeData>> = (node) => {
  const { data, selected } = node;

  return (
    <div
      className={clsx(
        "border-2 border-blue-200 w-64 h-20 px-4 rounded-md flex flex-col items-start justify-center",
        {
          "bg-blue-50": selected,
          "bg-white": !selected,
        }
      )}>
      <p className="font-bold text-black">{data.name}</p>
      <p className="w-full truncate text-black">{data.address}</p>
      <Handle isConnectable={false} type="source" position={Position.Right} className="opacity-0" />
      <Handle isConnectable={false} type="target" position={Position.Left} className="opacity-0" />
    </div>
  );
};
