import type { HeadersFunction, LoaderFunctionArgs } from "react-router";
import {
  Outlet,
  useLoaderData,
  useNavigate,
  useNavigation,
  useRouteError,
} from "react-router";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { AppProvider } from "@shopify/shopify-app-react-router/react";
import { authenticate } from "../shopify.server";
import tailwindStyles from "~/tailwind.css?url";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import "@shopify/app-bridge-react";

export const links = () => [{ rel: "stylesheet", href: tailwindStyles }];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);

  // eslint-disable-next-line no-undef
  return { apiKey: process.env.SHOPIFY_API_KEY || "" };
};

export default function App() {
  const { apiKey } = useLoaderData<typeof loader>();
  const { t } = useTranslation(["global"]);
  const navigation = useNavigation();

  useEffect(() => {
    shopify.loading(navigation.state === "loading");
  }, [navigation.state]);

  return (
    <AppProvider embedded apiKey={apiKey}>
      <s-app-nav>
        <s-link href="/app">{t("navigating.home")}</s-link>
        <s-link href="/app/orders">{t("navigating.orders")}</s-link>
        <s-link href="/app/settings">{t("navigating.settings")}</s-link>
        <s-link href="/app/plans">{t("navigating.plans")}</s-link>
      </s-app-nav>
      <Outlet />
    </AppProvider>
  );
}

export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers: HeadersFunction = (headersArgs) => {
  return boundary.headers(headersArgs);
};
