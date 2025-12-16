import "@shopify/shopify-app-react-router/adapters/node";
import {
  ApiVersion,
  AppDistribution,
  BillingInterval,
  DeliveryMethod,
  shopifyApp,
} from "@shopify/shopify-app-react-router/server";
import { PrismaSessionStorage } from "@shopify/shopify-app-session-storage-prisma";
import { getAppSubscription } from "./graphql/queries";
import prisma from "./db.server";

export const BASIC_MONTHLY = "Basic Monthly";
export const BASIC_ANNUAL = "Basic Annual";
export const PRO_MONTHLY = "Pro Monthly";
export const PRO_ANNUAL = "Pro Annual";
export const ENTERPRISE_MONTHLY = "Enterprise Monthly";
export const ENTERPRISE_ANNUAL = "Enterprise Annual";

export const plans = [
  {
    id: 1,
    name: BASIC_MONTHLY,
    price: 5,
    annualPrice: 5 * 12,
  },
  {
    id: 2,
    name: PRO_MONTHLY,
    price: 10,
    annualPrice: 10 * 12,
  },
  {
    id: 3,
    name: ENTERPRISE_MONTHLY,
    price: 50,
    annualPrice: 50 * 12,
  },
];

const shopify = shopifyApp({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET || "",
  apiVersion: ApiVersion.January26,
  scopes: process.env.SCOPES?.split(","),
  appUrl: process.env.SHOPIFY_APP_URL || "",
  authPathPrefix: "/auth",
  sessionStorage: new PrismaSessionStorage(prisma),
  distribution: AppDistribution.AppStore,
  ...(process.env.SHOP_CUSTOM_DOMAIN
    ? { customShopDomains: [process.env.SHOP_CUSTOM_DOMAIN] }
    : {}),
  billing: {
    [BASIC_MONTHLY]: {
      trialDays: 14,
      lineItems: [
        {
          amount: 5,
          currencyCode: "USD",
          interval: BillingInterval.Every30Days,
        },
      ],
    },
    [BASIC_ANNUAL]: {
      trialDays: 14,
      lineItems: [
        {
          amount: 5 * 12,
          currencyCode: "USD",
          interval: BillingInterval.Annual,
        },
      ],
    },
    [PRO_MONTHLY]: {
      trialDays: 14,
      lineItems: [
        {
          amount: 10,
          currencyCode: "USD",
          interval: BillingInterval.Every30Days,
        },
      ],
    },
    [PRO_ANNUAL]: {
      trialDays: 14,
      lineItems: [
        {
          amount: 10 * 12,
          currencyCode: "USD",
          interval: BillingInterval.Annual,
        },
      ],
    },
    [ENTERPRISE_MONTHLY]: {
      trialDays: 14,
      lineItems: [
        {
          amount: 50,
          currencyCode: "USD",
          interval: BillingInterval.Every30Days,
        },
      ],
    },
    [ENTERPRISE_ANNUAL]: {
      trialDays: 14,
      lineItems: [
        {
          amount: 50 * 12,
          currencyCode: "USD",
          interval: BillingInterval.Annual,
        },
      ],
    },
  },
  webhooks: {
    LOCATIONS_UPDATE: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: "/webhooks/locations",
    },
    LOCATIONS_CREATE: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: "/webhooks/locations",
    },
    LOCATIONS_DELETE: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: "/webhooks/locations",
    },
    COLLECTIONS_UPDATE: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: "/webhooks/collections",
    },
    COLLECTIONS_CREATE: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: "/webhooks/collections",
    },
    COLLECTIONS_DELETE: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: "/webhooks/collections",
    },
  },
  hooks: {
    afterAuth: async ({ session, admin }) => {
      if (session) {
        console.log("afterAuth hook");
        const subscriptionRes = await admin.graphql(getAppSubscription);

        const subscriptionData = (await subscriptionRes.json()).data;

        console.log(
          subscriptionData?.currentAppInstallation.activeSubscriptions,
        );

        shopify.registerWebhooks({ session });
      }
    },
  },
});

export default shopify;
export const apiVersion = ApiVersion.January26;
export const addDocumentResponseHeaders = shopify.addDocumentResponseHeaders;
export const authenticate = shopify.authenticate;
export const unauthenticated = shopify.unauthenticated;
export const login = shopify.login;
export const registerWebhooks = shopify.registerWebhooks;
export const sessionStorage = shopify.sessionStorage;
