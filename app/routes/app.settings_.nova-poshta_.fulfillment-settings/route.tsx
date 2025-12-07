import { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import NovaPoshtaFfSettings from "./app.settings.nova-poshta-fulfillment";
import { authenticate } from "~/shopify.server";
import NovaPoshtaWms from "~/api/novaPoshtaWms";

export { NovaPoshtaFfSettings as default };

export async function loader({ request }: LoaderFunctionArgs) {
  const { session } = await authenticate.admin(request);

  const np_session = new NovaPoshtaWms("web", "web", "TestOrganization");

  console.log(await np_session.getSoapClient());

  return { session };
}
