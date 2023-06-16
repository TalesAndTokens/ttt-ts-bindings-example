import type { PageServerLoad } from "./$types";
import { getBaseTokens } from "../ttt/getBaseTokens";
import { getCheckinLogs } from "../ttt/getCheckinLogs";

export const load: PageServerLoad = async () => {
  const tokens = await getBaseTokens();
  const checkinLogs = await getCheckinLogs();

  console.log("tokens", tokens);
  console.log("checkinLogs", checkinLogs);

  return { tokens, checkinLogs };
};
