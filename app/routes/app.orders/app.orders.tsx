import { useCallback } from "react";
import {
  useFetcher,
  useLoaderData,
  useLocation,
  useNavigate,
  useNavigation,
  useOutletContext,
  useRevalidator,
} from "react-router";
import IndexFilters from "./components/filters";
import { action, loader } from "./route";
import { useTranslation } from "react-i18next";

type Props = {};

export default function AppPage({}: Props) {
  const { t } = useTranslation(["settings", "global"]);
  const { state } = useRevalidator();
  const fetcher = useFetcher<typeof action>();
  const nav = useNavigation();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const {
    orders,
    filterTabs,
    selectedTabTitle,
    isDirty: { isDirty },
    toast,
  } = useLoaderData<typeof loader>();

  const handleNextPage = useCallback(() => {
    if (!orders?.pageInfo?.hasNextPage || !orders?.pageInfo.endCursor) return;

    params.set("cursor", orders?.pageInfo.endCursor);
    params.set("direction", "next");
    params.set("quantity", "4");
    navigate(`?${params.toString()}`);
  }, [JSON.stringify(orders)]);

  const handlePreviousPage = useCallback(() => {
    if (!orders?.pageInfo?.hasPreviousPage || !orders?.pageInfo.startCursor)
      return;

    params.set("cursor", orders?.pageInfo.startCursor);
    params.set("direction", "previous");
    params.set("quantity", "4");
    navigate(`?${params.toString()}`);
  }, [JSON.stringify(orders)]);

  return (
    <s-page heading={t("global:navigating.orders")} inlineSize="large">
      <s-section padding="none">
        <s-table
          loading={
            state !== "idle" || nav.state !== "idle" || fetcher.state !== "idle"
          }
          paginate
          hasNextPage={orders?.pageInfo.hasNextPage}
          hasPreviousPage={orders?.pageInfo.hasPreviousPage}
          onNextPage={() => handleNextPage()}
          onPreviousPage={() => handlePreviousPage()}
        >
          <s-table-header-row id="orders-table-header-row">
            <s-table-header listSlot="primary">Номер</s-table-header>
            <s-table-header listSlot="secondary">Замовник</s-table-header>
            <s-table-header format="currency">Сума</s-table-header>
            <s-table-header>ТТН</s-table-header>
            <s-table-header>До відвантаження</s-table-header>
            <s-table-header>Дії</s-table-header>
            <s-table-header>Статус виконання</s-table-header>
            <s-table-header>Статус оплати</s-table-header>
          </s-table-header-row>
          <IndexFilters
            selectedTabTitle={selectedTabTitle}
            filterTabs={filterTabs}
            isDirtyParams={isDirty}
            toast={toast}
          />
          <s-table-body>
            {orders &&
              orders?.edges.map(({ node }, i) => (
                <s-table-row key={`table-row-${i}`}>
                  <s-table-cell>{node.name}</s-table-cell>
                  <s-table-cell>{node.customer?.displayName}</s-table-cell>
                  <s-table-cell>
                    {(node.currentTotalPriceSet.presentmentMoney
                      .currencyCode === "UAH"
                      ? "₴"
                      : "") +
                      Number(
                        node.currentTotalPriceSet.presentmentMoney.amount,
                      ).toFixed(2)}
                  </s-table-cell>
                  <s-table-cell>18983261372173</s-table-cell>
                  <s-table-cell>
                    <s-stack direction="inline" justifyContent="center">
                      {node.lineItems.nodes.length}
                    </s-stack>
                  </s-table-cell>
                  <s-table-cell>
                    <s-button-group gap="none">
                      <s-button
                        accessibilityLabel="print-button"
                        variant="secondary"
                        icon="print"
                        slot="secondary-actions"
                        interestFor="print-tooltip"
                      />
                      <s-button
                        accessibilityLabel="create-shipping-button"
                        variant="secondary"
                        icon="globe"
                        slot="secondary-actions"
                        interestFor="create-shipping-tooltip"
                      />
                      <s-button
                        accessibilityLabel="connect-shipping-button"
                        variant="secondary"
                        icon="connect"
                        slot="secondary-actions"
                        interestFor="connect-shipping-tooltip"
                      />
                    </s-button-group>
                    <s-tooltip id="print-tooltip">Друк маркувань</s-tooltip>
                    <s-tooltip id="create-shipping-tooltip">
                      Створити відправлення
                    </s-tooltip>
                    <s-tooltip id="connect-shipping-tooltip">
                      Прив'язати відправлення
                    </s-tooltip>
                  </s-table-cell>
                  <s-table-cell>
                    <s-badge
                      tone={
                        node.displayFulfillmentStatus === "FULFILLED"
                          ? "neutral"
                          : node.displayFulfillmentStatus === "UNFULFILLED"
                            ? "caution"
                            : "warning"
                      }
                      icon={
                        node.displayFulfillmentStatus === "FULFILLED"
                          ? "enabled"
                          : node.displayFulfillmentStatus === "UNFULFILLED"
                            ? "incomplete"
                            : "in-progress"
                      }
                    >
                      {node?.displayFulfillmentStatus
                        ? node.displayFulfillmentStatus[0].toUpperCase() +
                          node.displayFulfillmentStatus
                            .slice(1)
                            .toLowerCase()
                            .replace("_", " ")
                        : ""}
                    </s-badge>
                  </s-table-cell>
                  <s-table-cell>
                    <s-badge
                      tone={
                        node?.displayFinancialStatus === "PAID"
                          ? "neutral"
                          : node?.displayFinancialStatus === "PENDING" ||
                              node?.displayFinancialStatus === "PARTIALLY_PAID"
                            ? "warning"
                            : "critical"
                      }
                      icon={
                        node.displayFinancialStatus === "PAID"
                          ? "enabled"
                          : node.displayFinancialStatus === "PENDING"
                            ? "incomplete"
                            : "in-progress"
                      }
                    >
                      {node?.displayFinancialStatus
                        ? node.displayFinancialStatus[0].toUpperCase() +
                          node.displayFinancialStatus
                            .slice(1)
                            .toLowerCase()
                            .replace("_", " ")
                        : ""}
                    </s-badge>
                  </s-table-cell>
                </s-table-row>
              ))}
          </s-table-body>
        </s-table>
      </s-section>
    </s-page>
  );
}
