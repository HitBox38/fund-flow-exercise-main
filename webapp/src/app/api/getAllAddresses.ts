"use client";

import { ChainAddress } from "../types/chainAddress";
import { API_URL } from "./api.constants";

export interface AllAddressesResData {
  addresses: ChainAddress[];
}

export const getAllAddresses = async (): Promise<AllAddressesResData> => {
  return await fetch(`${API_URL}/funding/graph/`).then((res) => res.json());
};
