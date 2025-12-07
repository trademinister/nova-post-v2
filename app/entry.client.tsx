import i18next from "i18next";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { HydratedRouter } from "react-router/dom";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import resources from "~/locales";

async function main() {
  // Get language from html tag (set by server)
  const htmlLang = document.documentElement.lang || "ua";
  
  await i18next
    .use(initReactI18next)
    .use(I18nextBrowserLanguageDetector)
    .init({
      lng: htmlLang,
      resources,
      supportedLngs: ["en", "ua"],
      fallbackLng: "ua",
      detection: { order: ["htmlTag"], caches: [] },
      react: { useSuspense: false },
    });

  startTransition(() => {
    hydrateRoot(
      document,
      <I18nextProvider i18n={i18next}>
        <StrictMode>
          <HydratedRouter />
        </StrictMode>
      </I18nextProvider>,
    );
  });
}

main().catch((error) => console.error(error));
