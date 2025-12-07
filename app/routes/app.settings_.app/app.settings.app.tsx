import React, { useEffect } from "react";
import { useLoaderData, useNavigation, useSubmit } from "react-router";
import { useTranslation } from "react-i18next";
import SvgIcons from "~/assets/icons/svgIcons";

export default function AppSettings() {
  const { t, i18n } = useTranslation(["appSettings", "navigation", "global"]);
  const navigation = useNavigation();

  const submit = useSubmit();
  const { locale } = useLoaderData<{ locale: string }>();

  useEffect(() => {
    if (locale && i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [i18n, locale]);

  const handleLanguageChange = (lng: string) => {
    if (i18n.language === lng) return;

    i18n.changeLanguage(lng);

    const formData = new FormData();
    formData.append("lng", lng);
    submit(formData, { method: "post", replace: true });
  };

  const languages = {
    en: { nativeName: "English" },
    ua: { nativeName: "Українська" },
  } as const;

  return (
    <s-page heading={t("page_title")}>
      <s-link slot="breadcrumb-actions" href="/app/settings">
        {t("navigation:settings")}
      </s-link>
      <s-box padding="base">
        <s-grid gridTemplateColumns="repeat(3, 1fr)" gap="base">
          <s-grid-item gridColumn="span 1">
            <s-stack rowGap="small-200">
              <s-heading>{t("app_language")}</s-heading>
              <s-text>{t("app_language_desc")}</s-text>
            </s-stack>
          </s-grid-item>
          <s-grid-item gridColumn="span 2">
            <s-section>
              <s-button-group gap="none">
                {(Object.keys(languages) as Array<keyof typeof languages>).map(
                  (lng) => {
                    return (
                      <s-button
                        key={lng}
                        disabled={i18n.language === lng}
                        loading={navigation.state !== "idle"}
                        slot="secondary-actions"
                        onClick={() => handleLanguageChange(lng)}
                      >
                        <s-stack
                          direction="inline"
                          columnGap="small-200"
                          alignItems="center"
                        >
                          <SvgIcons name={`lng-${lng}`} size={"24"} />
                          {languages[lng].nativeName}
                        </s-stack>
                      </s-button>
                    );
                  },
                )}
              </s-button-group>
            </s-section>
          </s-grid-item>
        </s-grid>
      </s-box>
    </s-page>
  );
}
