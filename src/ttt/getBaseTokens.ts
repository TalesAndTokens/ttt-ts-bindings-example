import { batchProvider } from "./batchProvider";
import { WORLD_ID, ETHEREUM_ACCOUNT_ADDRESS, GAME_ADDRESS } from "$env/static/private";

/* eslint-disable camelcase */
import { IGameAccess__factory, IL1NFT__factory, IWorldStore__factory } from "ttt-ts-bindings";

import type { BaseToken } from "./tokens";
import { callGet } from "./fetchClient";

const worldId = WORLD_ID;
const address = ETHEREUM_ACCOUNT_ADDRESS;
const gameAddress = GAME_ADDRESS;

export const getBaseTokens = async (): Promise<BaseToken[]> => {
  try {
    const provider = batchProvider();

    const game = IGameAccess__factory.connect(gameAddress, provider);
    const worldStoreAddress = await game.getInterfaceAddress("WorldStore");

    const worldStore = IWorldStore__factory.connect(worldStoreAddress, provider);
    const baseNftAddress = await worldStore.getTokenContract(worldId, "BaseNFT");

    const l1nft = IL1NFT__factory.connect(baseNftAddress, provider);
    const tokenIds = (await l1nft.getTokens(address)).map((item) => item.toNumber().toString());
    const tokenUrisPromises = tokenIds.map((tokenId) => {
      return l1nft.tokenURI(tokenId);
    });

    const tokenUris = await Promise.all(tokenUrisPromises);

    const tokenMetadataPromises = tokenIds.map((tokenId, index) => {
      return callGet(tokenUris[index]);
    });

    const tokenMetadatas = await Promise.all(tokenMetadataPromises);

    return tokenIds.map((tokenId, index) => {
      return { tokenId, owner: address, ...tokenMetadatas[index] };
    });
  } catch (e) {
    console.error(e);

    throw e;
  }
};
