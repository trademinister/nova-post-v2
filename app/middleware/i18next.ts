import { RemixI18Next } from "remix-i18next/server";
import { createCookie } from "react-router";
import resources from "~/locales";
import "i18next";

export const localeCookie = createCookie("lng", {
  path: "/",
  sameSite: "none",
  secure: true,
  httpOnly: true,
});

export const i18next = new RemixI18Next({
  detection: {
    supportedLanguages: ["en", "ua"],
    fallbackLanguage: "ua",
    cookie: localeCookie,
    order: ["cookie", "header"],
  },
  i18next: {
    resources,
  },
});

// Type-safety disabled to allow any translation keys without TypeScript errors
// Commented out to disable strict typing for translations
declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    resources: typeof resources.ua;
  }
}
