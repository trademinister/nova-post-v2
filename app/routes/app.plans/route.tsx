import type {
  ActionFunctionArgs,
  HeadersFunction,
  LoaderFunctionArgs,
} from "react-router";
import {
  authenticate,
  BASIC_ANNUAL,
  BASIC_MONTHLY,
  ENTERPRISE_ANNUAL,
  ENTERPRISE_MONTHLY,
  plans,
  PRO_ANNUAL,
  PRO_MONTHLY,
} from "./../../shopify.server";
import { getShopIsDev } from "~/graphql/queries";
import { boundary } from "@shopify/shopify-app-react-router/server";
import Plans from "./app.plans";

export { Plans as default };

export const headers: HeadersFunction = (headersArgs) => {
  return boundary.headers(headersArgs);
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { admin, billing } = await authenticate.admin(request);

  const isDev = await admin.graphql(getShopIsDev);
  const isDevData = (await isDev.json()).data?.shop.plan.partnerDevelopment;

  const { hasActivePayment, appSubscriptions } = await billing.check({
    plans: [
      BASIC_MONTHLY,
      BASIC_ANNUAL,
      PRO_MONTHLY,
      PRO_ANNUAL,
      ENTERPRISE_MONTHLY,
      ENTERPRISE_ANNUAL,
    ],
    isTest: isDevData,
  });

  return { plans, hasActivePayment, appSubscriptions };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { admin, billing } = await authenticate.admin(request);
  const data = await request.json();

  const isDev = await admin.graphql(getShopIsDev);

  const isDevData = (await isDev.json()).data?.shop.plan.partnerDevelopment;

  switch (data.action) {
    case "subscribe":
      await billing.request({
        plan: data.plan,
        isTest: isDevData,
      });

      return { status: "success" };
    case "cancel":
      const { appSubscriptions } = await billing.check({
        plans: [
          BASIC_MONTHLY,
          BASIC_ANNUAL,
          PRO_MONTHLY,
          PRO_ANNUAL,
          ENTERPRISE_MONTHLY,
          ENTERPRISE_ANNUAL,
        ],
        isTest: isDevData,
      });

      const activeSubscription = appSubscriptions.find(
        (subscription) => subscription.status === "ACTIVE",
      );

      if (!activeSubscription) {
        throw new Error("no_active_subscription");
      }

      await billing.cancel({
        subscriptionId: activeSubscription.id,
      });

      return { status: "success", message: "subscription_cancelled" };
    default:
      throw new Error("action_not_allowed");
  }
};
