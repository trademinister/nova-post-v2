import { useTranslation } from "react-i18next";

type Props = {};

export default function DomesticDeliveryMethods({}: Props) {
  const { t } = useTranslation(["delivery_settings", "global"]);

  return (
    <s-page heading={t("domestic.title")}>
      <s-link slot="breadcrumb-actions" href="/app/settings">
        {t("global:navigating.settings")}
      </s-link>
      <s-stack direction="block" gap="base">
        <s-section padding="none">
          <s-stack direction="block" gap="small-300">
            <s-box paddingBlockStart="small-300" paddingInlineStart="small-100">
              <s-text type="strong">Ukraine</s-text>
            </s-box>
            <s-table>
              <s-table-header-row>
                <s-table-header>{t("table.header.title")}</s-table-header>
                <s-table-header>
                  <s-text>{t("table.header.delivery_type")}</s-text>
                </s-table-header>
              </s-table-header-row>
              <s-table-body>
                <s-table-row>
                  <s-table-cell>Доставка у Відділення НП</s-table-cell>
                  <s-table-cell>
                    <s-stack
                      direction="inline"
                      alignItems="center"
                      gap="small-200"
                    >
                      <s-text>{t("table.value.courier")}</s-text>
                      <s-switch label={t("table.value.warehouse")}></s-switch>
                    </s-stack>
                  </s-table-cell>
                </s-table-row>
                <s-table-row>
                  <s-table-cell>Доставка у Відділення НП</s-table-cell>
                  <s-table-cell>
                    <s-stack
                      direction="inline"
                      alignItems="center"
                      gap="small-200"
                    >
                      <s-text>{t("table.value.courier")}</s-text>
                      <s-switch label={t("table.value.warehouse")}></s-switch>
                    </s-stack>
                  </s-table-cell>
                </s-table-row>
                <s-table-row>
                  <s-table-cell>Доставка у Відділення НП</s-table-cell>
                  <s-table-cell>
                    <s-stack
                      direction="inline"
                      alignItems="center"
                      gap="small-200"
                    >
                      <s-text>{t("table.value.courier")}</s-text>
                      <s-switch label={t("table.value.warehouse")}></s-switch>
                    </s-stack>
                  </s-table-cell>
                </s-table-row>
                <s-table-row>
                  <s-table-cell>Доставка у Відділення НП</s-table-cell>
                  <s-table-cell>
                    <s-stack
                      direction="inline"
                      alignItems="center"
                      gap="small-200"
                    >
                      <s-text>{t("table.value.courier")}</s-text>
                      <s-switch label={t("table.value.warehouse")}></s-switch>
                    </s-stack>
                  </s-table-cell>
                </s-table-row>
                <s-table-row>
                  <s-table-cell>Доставка у Відділення НП</s-table-cell>
                  <s-table-cell>
                    <s-stack
                      direction="inline"
                      alignItems="center"
                      gap="small-200"
                    >
                      <s-text>{t("table.value.courier")}</s-text>
                      <s-switch label={t("table.value.warehouse")}></s-switch>
                    </s-stack>
                  </s-table-cell>
                </s-table-row>
              </s-table-body>
            </s-table>
          </s-stack>
        </s-section>
        <s-section heading="Europe"></s-section>
      </s-stack>
    </s-page>
  );
}
