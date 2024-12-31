"use client";

import { ChainAddress } from "@/app/types/chainAddress";
import { FundingResData } from "@/app/types/fundingRecord";

export const getFundingGraph = async (source: ChainAddress): Promise<FundingResData> => {
  return await fetch(
    `http://127.0.0.1:8000/api/v1/funding/graph/${source.chainId}/${source.address}`
  ).then((res) => res.json());
};
