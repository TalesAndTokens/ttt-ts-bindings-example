import { ethers } from "ethers";
import { CHAIN_ID, JSON_RPC_URL } from "$env/static/private";

const netWorks = {
  "0x89": {
    name: "matic",
    chainId: 137,
  },
  "0x13881": {
    name: "maticmum",
    chainId: 80001,
  },
  "0x51": {
    name: "shibuya",
    chainId: 81,
  },
  "0x250": {
    name: "astar",
    chainId: 592,
  },
};

type ChainID = keyof typeof netWorks;

export const batchProvider = (chainId?: ChainID, rpcUrl?: string) => {
  return defaultProvider(chainId || (CHAIN_ID as ChainID), rpcUrl || JSON_RPC_URL);
};

function defaultProvider(chainId: ChainID, rpcUrl: string) {
  const network = netWorks[chainId];

  return new ethers.JsonRpcProvider(rpcUrl, network, { batchMaxCount: 100 });
}
