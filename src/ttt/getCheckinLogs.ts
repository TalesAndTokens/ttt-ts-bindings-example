import { batchProvider } from "./batchProvider";
// eslint-disable-next-line camelcase
import { IEventCheckin__factory, IGameAccess__factory } from "ttt-ts-bindings";
import { ETHEREUM_ACCOUNT_ADDRESS, GAME_ADDRESS, WORLD_ID } from "$env/static/private";
import { events } from "./data/events";

const worldId = WORLD_ID;
const address = ETHEREUM_ACCOUNT_ADDRESS;
const gameAddress = GAME_ADDRESS;

export const getCheckinLogs = async () => {
  const provider = batchProvider();

  // eslint-disable-next-line camelcase
  const game = IGameAccess__factory.connect(gameAddress, provider);
  const eventCheckinAddress = await game.getInterfaceAddress("EventCheckin");
  // eslint-disable-next-line camelcase
  const eventCheckin = IEventCheckin__factory.connect(eventCheckinAddress, provider);

  const countPromises = events.map(async (event) => {
    return eventCheckin.getCheckinCountFromPlayer(address, worldId, event.eventDefinitionId);
  });

  const timestampPromises = events.map(async (event) => {
    return eventCheckin.getLatestCheckinTimestampFromPlayer(address, worldId, event.eventDefinitionId);
  });

  const counts = (await Promise.all(countPromises)).map((count) => count.toNumber());
  const timestamps = (await Promise.all(timestampPromises)).map((timestamp) => timestamp.toNumber());

  return events.map((event, index) => {
    return {
      ...event,
      count: counts[index],
      timestamp: timestamps[index],
    };
  });
};
