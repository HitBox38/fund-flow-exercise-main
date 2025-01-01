"use client";

import { AddressType, ChainAddress, ChainIds } from "@/app/types/chainAddress";
import { useFundsFlow } from "./hooks/useFundsFlow";
import { Spinner } from "../components/spinner/Spinner";
import FlowChart from "../components/charts/FlowChart";
import { useQuery } from "@tanstack/react-query";
import { getAllAddresses } from "../api/getAllAddresses";
import clsx from "clsx";
import { Error } from "../components/error/Error";

const sourceChainAddress: ChainAddress = {
  address: "0x39cd23328b5ba304ae70bb0c1866e224f727f962",
  chainId: ChainIds.EthereumMainnet,
  type: AddressType.EOA,
};

export default function Dashboard() {
  const {
    data,
    isLoading: isLoadingAddresses,
    error: allAddressesError,
  } = useQuery({
    queryKey: ["allAddresses"],
    queryFn: () => getAllAddresses(),
    refetchOnWindowFocus: false,
  });

  const {
    isLoading: isLoadingFundsFlow,
    nodes,
    edges,
    error: fundsFlowError,
  } = useFundsFlow(allAddressesError ? [] : data?.addresses || []);

  const isLoading = isLoadingAddresses || isLoadingFundsFlow;

  return (
    <div
      className={clsx("flex flex-col items-center justify-center w-full h-full rounded-lg", {
        "bg-slate-200": !isLoading,
        "bg-slate-800": isLoading,
      })}>
      {isLoading ? (
        <Spinner />
      ) : allAddressesError ? (
        <Error error={allAddressesError} />
      ) : fundsFlowError ? (
        <Error error={fundsFlowError} />
      ) : (
        <FlowChart nodes={nodes} edges={edges} onEdgesChange={() => {}} onNodesChange={() => {}} />
      )}
    </div>
  );
}
