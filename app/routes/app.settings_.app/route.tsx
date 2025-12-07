import {
  data,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "react-router";
import AppSettings from "./app.settings.app";
import { authenticate } from "~/shopify.server";
import { localeCookie } from "~/middleware/i18next";
import { i18next } from "~/middleware/i18next";

export { AppSettings as default };

export async function loader({ request }: LoaderFunctionArgs) {
  const { session } = await authenticate.admin(request);
  const locale = await i18next.getLocale(request);

  return data(
    { session, locale },
    { headers: { "Set-Cookie": await localeCookie.serialize(locale) } },
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const { session } = await authenticate.admin(request);

  const formData = await request.formData();
  const lng = formData.get("lng");

  let headers: HeadersInit | undefined;

  if (typeof lng === "string") {
    headers = {
      "Set-Cookie": await localeCookie.serialize(lng),
    };
  }

  return data(session, headers ? { headers } : undefined);
}
