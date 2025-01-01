"use client";

import { ChainAddress } from "@/app/types/chainAddress";
import { FundingResData } from "@/app/types/fundingRecord";
import { API_URL } from "./api.constants";

export const getFundingGraph = async (source: ChainAddress): Promise<FundingResData> => {
  return await fetch(`${API_URL}/funding/graph/${source.chainId}/${source.address}`).then((res) =>
    res.json()
  );
};
