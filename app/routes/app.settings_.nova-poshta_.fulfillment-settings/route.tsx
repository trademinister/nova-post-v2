import { LoaderFunctionArgs } from "react-router";
import NovaPoshtaFfSettings from "./app.settings.nova-poshta-fulfillment";
import { authenticate } from "~/shopify.server";

export { NovaPoshtaFfSettings as default };

export async function loader({ request }: LoaderFunctionArgs) {
  const { session } = await authenticate.admin(request);

  return { session };
}
