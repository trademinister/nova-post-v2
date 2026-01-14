import { LoaderFunctionArgs } from "react-router";
import Logs from "./app.logs";
import { authenticate } from "~/shopify.server";
import { getLogs } from "./../.server/logs";

export { Logs as default };

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);

  const logs = await getLogs(session.id);

  return { logs };
};
