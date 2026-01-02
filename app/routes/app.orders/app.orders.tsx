import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  useFetcher,
  useLoaderData,
  useLocation,
  useNavigate,
  useNavigation,
  useRevalidator,
} from "react-router";
import IndexFilters from "./components/filters";
import { loader } from "./route";
import { loader as productsFFLoader } from "../api.get-products-for-fulfillment";
import { formatIsoWithoutTZ } from "./client-functions";
import CustomerPopover from "./components/popovers/customer-popover";
import ProductsPopover from "./components/popovers/products-popover";

type Props = {};

export default function AppPage({}: Props) {
  const { t } = useTranslation(["settings", "global"]);
  const { state } = useRevalidator();
  const nav = useNavigation();
  const fetcher = useFetcher<typeof productsFFLoader>({
    key: "products-for-fulfillment",
  });

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

  const orderNodes = orders?.edges?.map((e) => e.node) ?? [];
  type OrderNode = (typeof orderNodes)[number];
  type OrderId = OrderNode["id"];

  const [selectedOrderIds, setSelectedOrderIds] = useState<OrderId[]>([]);

  const toggleItem = (id: OrderId, checked: boolean) =>
    setSelectedOrderIds((prev) =>
      checked ? [...prev, id] : prev.filter((x) => x !== id),
    );

  const toggleAll = (checked: boolean) =>
    setSelectedOrderIds(checked ? orderNodes.map((o) => o.id) : []);

  const isSelected = (id: OrderId) => selectedOrderIds.includes(id);

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

  console.log(isDirty);

  return (
    <s-page heading={t("global:navigating.orders")} inlineSize="large">
      <s-section padding="none">
        <s-table
          loading={state !== "idle" || nav.state !== "idle"}
          paginate
          hasNextPage={orders?.pageInfo.hasNextPage}
          hasPreviousPage={orders?.pageInfo.hasPreviousPage}
          onNextPage={() => handleNextPage()}
          onPreviousPage={() => handlePreviousPage()}
        >
          <s-table-header-row id="orders-table-header-row">
            {selectedOrderIds.length > 0 ? (
              <>
                <s-table-header listSlot="primary">
                  <s-stack gap="small-100" direction="inline">
                    <s-checkbox
                      indeterminate={
                        selectedOrderIds.length !== 0 &&
                        selectedOrderIds.length !== orders?.edges.length
                      }
                      checked={selectedOrderIds.length === orders?.edges.length}
                      onChange={(e) => toggleAll(e.currentTarget.checked)}
                    />
                    <s-text>{`${selectedOrderIds.length} обрано`}</s-text>
                  </s-stack>
                </s-table-header>
                <s-table-header listSlot="secondary"></s-table-header>
                <s-table-header format="currency"></s-table-header>
                <s-table-header></s-table-header>
                <s-table-header></s-table-header>
                <s-table-header></s-table-header>
                <s-table-header></s-table-header>
                <s-table-header>
                  <s-clickable-chip>Роздрукувати</s-clickable-chip>
                </s-table-header>
              </>
            ) : (
              <>
                <s-table-header listSlot="primary">
                  <s-stack gap="small-100" direction="inline">
                    <s-checkbox
                      indeterminate={
                        selectedOrderIds.length !== 0 &&
                        selectedOrderIds.length !== orders?.edges.length
                      }
                      checked={selectedOrderIds.length === orders?.edges.length}
                      onChange={(e) => toggleAll(e.currentTarget.checked)}
                    />
                    <s-text>Номер</s-text>
                  </s-stack>
                </s-table-header>
                <s-table-header listSlot="secondary">Замовник</s-table-header>
                <s-table-header format="currency">Сума</s-table-header>
                <s-table-header>ТТН</s-table-header>
                <s-table-header>До відвантаження</s-table-header>
                <s-table-header>Дії</s-table-header>
                <s-table-header>Статус виконання</s-table-header>
                <s-table-header>Статус оплати</s-table-header>{" "}
              </>
            )}
          </s-table-header-row>
          <IndexFilters
            selectedTabTitle={selectedTabTitle}
            filterTabs={filterTabs}
            isDirtyParams={isDirty}
            toast={toast}
          />

          <s-table-body>
            {orders &&
              orders.edges.map(({ node }, i) => (
                <s-table-row key={`table-row-${i}`}>
                  <s-table-cell>
                    <s-stack
                      gap="small-100"
                      direction="inline"
                      alignItems="center"
                    >
                      <s-checkbox
                        checked={isSelected(node.id)}
                        onChange={(e) =>
                          toggleItem(node.id, e.currentTarget.checked)
                        }
                      />
                      <s-stack direction="block">
                        <s-stack direction="inline" alignItems="center">
                          <s-link
                            href={`shopify://admin/orders/${node.id.split("/").pop()}`}
                            target="_blank"
                          >
                            {node.name}
                          </s-link>
                          {node.note && (
                            <s-icon
                              type="note"
                              tone="info"
                              interestFor="note-tooltip"
                            />
                          )}
                          <s-tooltip id="note-tooltip">{node.note}</s-tooltip>
                        </s-stack>
                        {formatIsoWithoutTZ(node.createdAt)}
                      </s-stack>
                    </s-stack>
                  </s-table-cell>
                  <s-table-cell>
                    <s-clickable
                      background="transparent"
                      commandFor={`customer-popover-${i}`}
                    >
                      <s-stack
                        direction="inline"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <s-stack direction="block" padding="small-300">
                          <s-text>{node.customer?.displayName}</s-text>
                          <s-text>{node.phone}</s-text>
                        </s-stack>
                        <s-icon type="select" />
                      </s-stack>
                    </s-clickable>
                    <CustomerPopover
                      i={i}
                      customer={
                        node.customer == null
                          ? undefined
                          : { ...node.customer, phone: node.phone }
                      }
                    />
                  </s-table-cell>
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
                    {node.displayFulfillmentStatus === "FULFILLED" ||
                    node.currentSubtotalLineItemsQuantity === 0 ? (
                      <s-text color="subdued">Замовлення завершено</s-text>
                    ) : (
                      <s-clickable commandFor={`products-popover-${i}`}>
                        <s-stack direction="inline" alignItems="center">
                          <s-stack
                            direction="block"
                            justifyContent="center"
                            alignItems="center"
                          >
                            <div
                              style={{
                                position: "relative",
                                display: "inline-block",
                              }}
                            >
                              <s-thumbnail
                                size="small"
                                src={
                                  node.fulfillmentOrders.nodes[0].lineItems
                                    .nodes[0].image?.url ?? undefined
                                }
                              />
                              <div
                                style={{
                                  position: "absolute",
                                  top: 0,
                                  right: 0,
                                  transform: "translate(50%, -40%)",
                                  pointerEvents: "none",
                                }}
                              >
                                <s-badge>
                                  {
                                    node.fulfillmentOrders.nodes[0].lineItems
                                      .nodes.length
                                  }
                                </s-badge>
                              </div>
                            </div>
                          </s-stack>
                          <s-icon type="chevron-down"></s-icon>
                        </s-stack>
                      </s-clickable>
                    )}

                    <ProductsPopover orderId={node.id} i={i} />
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
