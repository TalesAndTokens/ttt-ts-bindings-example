import { ethers } from "ethers";
import { CHAIN_ID, JSON_RPC_URL } from "$env/static/private";

export const batchProvider = (chainId?: string, rpcUrl?: string) => {
  return defaultProvider(chainId || CHAIN_ID, rpcUrl || JSON_RPC_URL);
};

function defaultProvider(chainId: string, rpcUrl: string) {
  switch (chainId) {
    case "0x89":
      return polygonProvider(rpcUrl);
    case "0x13881":
      return mumbaiProvider(rpcUrl);
    case "0x51":
      return shibuyaProvider(rpcUrl);
    case "0x250":
      return astarProvider(rpcUrl);
    default:
      throw `wrong chainId: ${chainId}`;
  }
}

function mumbaiProvider(rpcUrl: string) {
  return ethers.getDefaultProvider({
    name: "maticmum",
    chainId: 80001,
    _defaultProvider: () => new ethers.providers.JsonRpcBatchProvider(rpcUrl),
  });
}

function polygonProvider(rpcUrl: string) {
  return ethers.getDefaultProvider({
    name: "matic",
    chainId: 137,
    _defaultProvider: () => new ethers.providers.JsonRpcBatchProvider(rpcUrl),
  });
}

function shibuyaProvider(rpcUrl: string) {
  return ethers.getDefaultProvider({
    name: "shibuya",
    chainId: 81,
    _defaultProvider: (providers) => new providers.JsonRpcBatchProvider(rpcUrl),
  });
}

function astarProvider(rpcUrl: string) {
  return ethers.getDefaultProvider({
    name: "astar",
    chainId: 592,
    _defaultProvider: (providers) => new providers.JsonRpcBatchProvider(rpcUrl),
  });
}
