import type { HeadersFunction } from "react-router";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { useTranslation } from "react-i18next";

export default function Index() {
  const { t } = useTranslation(["home", "global"]);

  return (
    <s-page heading="Shopify app template">
      <s-box padding="base">
        <s-stack gap="base">
          {/* === */}
          {/* METRICS */}
          {/* {===} */}
          <s-section padding="base">
            <s-grid gridTemplateColumns="1fr auto 1fr auto 1fr" gap="small">
              <s-stack>{t("metrics.total_fulfilled_by_nova_poshta")}</s-stack>
              <s-divider direction="block" />
              <s-stack>{t("metrics.percentage_of_returned")}</s-stack>
              <s-divider direction="block" />
              <s-stack>{t("metrics.total_fulfilled_by_nova_poshta")}</s-stack>
            </s-grid>
          </s-section>
          {/* === */}
          {/* NEWS */}
          {/* Updates and news */}
          {/* {===} */}
          <s-section padding="base" heading={t("news.heading")}>
            <s-grid gridTemplateColumns="repeat(2, 1fr)" gap="base">
              <s-box border="base" borderRadius="base" padding="base">
                <s-stack>
                  <s-heading>News 1</s-heading>
                  <s-paragraph>Description 1</s-paragraph>
                </s-stack>
              </s-box>
              <s-box border="base" borderRadius="base" padding="base">
                <s-stack>
                  <s-heading>News 2</s-heading>
                  <s-paragraph>
                    Description long description very long description some very
                    long description like that and some more text and more more
                    more more more more more more more more 2
                  </s-paragraph>
                </s-stack>
              </s-box>
            </s-grid>
          </s-section>
          {/* === */}
          {/* FEATURED APPS */}
          {/* Our apps and services */}
          {/* {===} */}
          <s-section padding="base" heading={t("featured_apps.heading")}>
            <s-grid gridTemplateColumns="repeat(3, 1fr)" gap="base">
              <s-box border="base" borderRadius="base" padding="base">
                <s-grid
                  gridTemplateColumns="auto 1fr auto"
                  gap="small"
                  alignItems="stretch"
                >
                  <s-thumbnail
                    size="small"
                    src="https://cdn.shopify.com/app-store/listing_images/7fb2f3f45c2664baaacfb5c98b0d9d2d/icon/CMjz19W2kv8CEAE=.png"
                    alt="App 1"
                  />
                  {/* <div className="bg-gray-50">
                    <s-thumbnail
                      size="small"
                      src="https://cdn.shopify.com/app-store/listing_images/7fb2f3f45c2664baaacfb5c98b0d9d2d/icon/CMjz19W2kv8CEAE=.png"
                      alt="App 1"
                    />
                  </div> */}
                  <s-box>
                    <s-heading>
                      {t("featured_apps.ukrposhta_shipping.title")}
                    </s-heading>
                    <s-paragraph>
                      {t("featured_apps.ukrposhta_shipping.description")}
                    </s-paragraph>
                  </s-box>
                  <s-stack justifyContent="start">
                    <s-button
                      icon="download"
                      href="https://apps.shopify.com/ukrposhta-shipping"
                    />
                  </s-stack>
                </s-grid>
              </s-box>
              <s-box border="base" borderRadius="base" padding="base">
                <s-grid
                  gridTemplateColumns="auto 1fr auto"
                  gap="small"
                  alignItems="stretch"
                >
                  <s-thumbnail
                    size="small"
                    src="https://cdn.shopify.com/app-store/listing_images/d3471f252a8063bf7076ae024eb65305/icon/CJSJ45CGgIEDEAE=.jpeg"
                    alt="App 1"
                  />
                  <s-box>
                    <s-heading>
                      {t("featured_apps.vchasno_kasa.title")}
                    </s-heading>
                    <s-paragraph>
                      {t("featured_apps.vchasno_kasa.description")}
                    </s-paragraph>
                  </s-box>
                  <s-stack justifyContent="start">
                    <s-button
                      icon="download"
                      href="https://apps.shopify.com/vchasno-kasa"
                    />
                  </s-stack>
                </s-grid>
              </s-box>
              <s-box border="base" borderRadius="base" padding="base">
                <s-grid
                  gridTemplateColumns="auto 1fr auto"
                  gap="small"
                  alignItems="stretch"
                >
                  <s-thumbnail
                    size="small"
                    src="https://cdn.shopify.com/app-store/listing_images/446aeaf1c1f2e5dda7fcdedd3b9b60e6/icon/CMCHiK-0l4YDEAE=.png"
                  />
                  <s-box>
                    <s-heading>{t("featured_apps.wawi_crm.title")}</s-heading>
                    <s-paragraph>
                      {t("featured_apps.wawi_crm.description")}
                    </s-paragraph>
                  </s-box>
                  <s-stack justifyContent="start">
                    <s-button
                      icon="download"
                      href="https://apps.shopify.com/wawi-crm"
                    />
                  </s-stack>
                </s-grid>
              </s-box>
            </s-grid>
          </s-section>
        </s-stack>
      </s-box>
    </s-page>
  );
}

export const headers: HeadersFunction = (headersArgs) => {
  return boundary.headers(headersArgs);
};
