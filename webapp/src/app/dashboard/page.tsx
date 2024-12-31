"use client";

import { AddressType, ChainAddress, ChainIds } from "@/app/types/chainAddress";
import { useFundsFlow } from "./hooks/useFundsFlow";
import { Spinner } from "../components/spinner/Spinner";
import FlowChart from "../components/charts/FlowChart";

const sourceChainAddress: ChainAddress = {
  address: "0x39cd23328b5ba304ae70bb0c1866e224f727f962",
  chainId: ChainIds.EthereumMainnet,
  type: AddressType.EOA,
};

export default function Dashboard() {
  const { isLoading, nodes, edges } = useFundsFlow(sourceChainAddress);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-slate-100 rounded-lg">
      {isLoading ? (
        <Spinner />
      ) : (
        <FlowChart edges={edges} nodes={nodes} onEdgesChange={() => {}} onNodesChange={() => {}} />
      )}
    </div>
  );
}
