import { JsonValue } from "@prisma/client/runtime/library";
import debounce from "debounce";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import {
  useFetcher,
  useLocation,
  useNavigate,
  useNavigation,
  useRevalidator,
} from "react-router";
import { action } from "../route";
import { Filters, FormValues } from "../types";
import TabCreateModal from "./modals/create-tab-modal";
import StatusesFilterSelector from "./popovers/statuses-filter-selector";
import TabRenameModal from "./modals/rename-tab-modal";
import TabDeleteModal from "./modals/tab-delete-confirmation-modal";
import TabDublicateModal from "./modals/tab-dublicate-modal";
import { tabToFormValues } from "../client-functions";
import TabManager from "./popovers/tab-manager";

type Props = {
  filterTabs: {
    query: string;
    id: string;
    title: string;
    sort: string;
    filters: JsonValue;
  }[];
  selectedTabTitle: string;
  isDirtyParams: boolean;
  toast:
    | {
        status: "success" | "error" | "switched";
        message: string;
      }
    | undefined;
};

export default function IndexFilters({
  filterTabs,
  selectedTabTitle,
  isDirtyParams,
  toast,
}: Props) {
  const { revalidate, state } = useRevalidator();
  const fetcher = useFetcher<typeof action>();
  const navigate = useNavigate();
  const nav = useNavigation();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [isSearching, setIsSearching] = useState(false);
  const [typingLock, setTypingLock] = useState(false);

  const isBusy =
    state !== "idle" || nav.state !== "idle" || fetcher.state !== "idle";

  const optimisticTabTitle =
    fetcher.state !== "idle" && fetcher.formData?.get("action") === "switch"
      ? String(fetcher.formData.get("tab"))
      : selectedTabTitle;

  const selectedTab = useMemo(() => {
    return (
      filterTabs.find((t) => t.title === optimisticTabTitle) ?? filterTabs[0]
    );
  }, [filterTabs, optimisticTabTitle]);

  const {
    watch,
    setValue,
    reset,
    getValues,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<FormValues>({
    defaultValues: {
      search: selectedTab.query || "",
      paymentStatusesFilterVisibility: Array.isArray(
        (selectedTab.filters as Filters)?.paymentStatuses,
      )
        ? true
        : false,
      paymentStatusesFilter:
        (selectedTab.filters as Filters)?.paymentStatuses || [],
      fulfillmentStatusesFilterVisibility: Array.isArray(
        (selectedTab.filters as Filters)?.fulfillmentStatuses,
      )
        ? true
        : false,
      fulfillmentStatusesFilter:
        (selectedTab.filters as Filters)?.fulfillmentStatuses || [],
      tagFilterVisibility: (selectedTab.filters as Filters).tag ? true : false,
      tagFilter: (selectedTab.filters as Filters).tag || "",
      productsFilterVisibility: Array.isArray(
        (selectedTab.filters as Filters).products,
      )
        ? true
        : false,
      productsFilter: (selectedTab.filters as Filters).products || [],
      sortDirection: selectedTab.sort.split(",")[1] as "asc" | "desc",
      sortKey: selectedTab.sort.split(",")[0],
    },
  });

  const search = watch("search");
  const paymentStatusFilterVisibility = watch(
    "paymentStatusesFilterVisibility",
  );
  const paymentStatusesFilter = watch("paymentStatusesFilter");
  const fulfillmentStatusFilterVisibility = watch(
    "fulfillmentStatusesFilterVisibility",
  );
  const fulfillmentStatusesFilter = watch("fulfillmentStatusesFilter");
  const tagFilterVisibility = watch("tagFilterVisibility");
  const tagFilter = watch("tagFilter");
  const productsFilterVisibility = watch("productsFilterVisibility");
  const productsFilter = watch("productsFilter");
  const sortDirection = watch("sortDirection");
  const sortKey = watch("sortKey");

  function filter(
    query: string,
    filterName?: string,
    value?: string | string[],
  ) {
    if (query) {
      params.set("search", query);
    } else {
      params.delete("search");
    }
    if (filterName) {
      if (Array.isArray(value)) {
        value.length
          ? params.set(filterName, value.join(","))
          : params.delete(filterName);
      } else {
        value ? params.set(filterName, value) : params.delete(filterName);
      }
    }
    params.set("quantity", "4");
    navigate(`?${params.toString()}`);
  }

  const onTabClick = useCallback(
    (nextTitle: string) => {
      [
        "search",
        "paymentStatuses",
        "fulfillmentStatuses",
        "tag",
        "products",
      ].forEach((k) => params.delete(k));
      if (selectedTabTitle === nextTitle) return;

      fetcher.submit(
        { tab: nextTitle, action: "switch" },
        { method: "POST", action: "." },
      );
    },
    [fetcher, selectedTabTitle],
  );

  const searchDebounce = useMemo(() => debounce(filter, 1000), []);
  const typingDebounce = useMemo(
    () => debounce(() => setTypingLock(false), 1000),
    [],
  );

  useEffect(() => {
    if (params.get("customerId")) {
      setIsSearching(true);
    }
  }, [params.get("customerId")]);

  useEffect(() => {
    if (!toast) return;

    if (toast.status === "error") {
      shopify.toast.show(toast.message, { isError: true });
      return;
    }

    if (toast.status !== "success" && toast.status !== "switched") return;

    setIsSearching(false);

    if (toast.status === "success") {
      shopify.toast.show(toast.message);
    }

    reset(tabToFormValues(selectedTab));
  }, [toast]);

  useEffect(() => {
    setTypingLock(true);
    typingDebounce();
  }, [search, tagFilter]);

  return (
    <s-grid gridTemplateColumns="1fr auto auto" gap="small-200" slot="filters">
      <s-grid-item>
        {isSearching ? (
          <s-stack direction="block" gap="small-300">
            <s-search-field
              placeholder="Пошук"
              label="Пошук"
              labelAccessibilityVisibility="exclusive"
              disabled={state !== "idle" || fetcher.state !== "idle"}
              value={search}
              onInput={(e) => {
                setValue("search", e.currentTarget.value, {
                  shouldDirty: true,
                });
                searchDebounce(e.currentTarget.value);
              }}
              autocomplete="off"
            >
              <s-icon slot="accessory" type="x-circle"></s-icon>
            </s-search-field>
            <s-stack direction="inline" gap="small-500">
              {params.get("customerId") && (
                <s-clickable-chip color="subdued">
                  Пошук за замовником
                </s-clickable-chip>
              )}
              {paymentStatusFilterVisibility && (
                <s-clickable-chip
                  color="subdued"
                  commandFor="payment-status-popover"
                  removable
                  onRemove={() => {
                    setValue("paymentStatusesFilterVisibility", false);
                    setValue("paymentStatusesFilter", [], {
                      shouldDirty: true,
                    });
                    params.delete("paymentStatuses");
                    navigate(`?${params.toString()}`);
                  }}
                >
                  {paymentStatusesFilter.length === 0 ? (
                    <s-stack direction="inline">
                      <s-text>Статус оплати</s-text>
                      <s-icon type="caret-down" />
                    </s-stack>
                  ) : (
                    `Статус оплати: ${paymentStatusesFilter.join(", ")}`
                  )}
                </s-clickable-chip>
              )}
              {fulfillmentStatusFilterVisibility && (
                <s-clickable-chip
                  color="subdued"
                  commandFor="fulfillment-status-popover"
                  removable
                  onRemove={() => {
                    setValue("fulfillmentStatusesFilterVisibility", false);
                    setValue("fulfillmentStatusesFilter", [], {
                      shouldDirty: true,
                    });
                    params.delete("fulfillmentStatuses");
                    navigate(`?${params.toString()}`);
                  }}
                >
                  {fulfillmentStatusesFilter.length === 0 ? (
                    <s-stack direction="inline">
                      <s-text>Статус виконання</s-text>
                      <s-icon type="caret-down" />
                    </s-stack>
                  ) : (
                    `Статус виконання: ${fulfillmentStatusesFilter.map((status) => (status === "shipped" ? "Fulfilled" : status === "unshipped" ? "Unfulfilled" : "Partially fulfilled")).join(", ")}`
                  )}
                </s-clickable-chip>
              )}
              {tagFilterVisibility && (
                <s-clickable-chip
                  color="subdued"
                  commandFor="tag-popover"
                  removable
                  onRemove={() => {
                    setValue("tagFilterVisibility", false);
                    setValue("tagFilter", "", { shouldDirty: true });
                    params.delete("tag");
                    navigate(`?${params.toString()}`);
                  }}
                >
                  {!tagFilter ? (
                    <s-stack direction="inline">
                      <s-text>Позначено тегом</s-text>
                      <s-icon type="caret-down" />
                    </s-stack>
                  ) : (
                    `Позначено тегом: ${tagFilter}`
                  )}
                </s-clickable-chip>
              )}
              {productsFilterVisibility && (
                <s-clickable-chip
                  color="subdued"
                  removable
                  onRemove={() => {
                    setValue("productsFilterVisibility", false);
                    setValue("productsFilter", [], { shouldDirty: true });
                    params.delete("products");
                    navigate(`?${params.toString()}`);
                  }}
                  onClick={async (e) => {
                    const selectedProducts = await shopify.resourcePicker({
                      type: "product",
                      multiple: true,
                      action: "select",
                      selectionIds: productsFilter.map((product) => ({
                        id: product.id,
                        variants: product.variants.map((variant) => ({
                          id: variant.id!,
                        })),
                      })),
                    });

                    if (!selectedProducts) {
                      return;
                    }

                    const products = selectedProducts?.map((product) => ({
                      id: product.id,
                      variants: product.variants.map((variant) => ({
                        id: variant.id,
                        sku: variant.sku,
                      })),
                    }));
                    setValue("productsFilter", products, {
                      shouldDirty: true,
                    });
                    filter(
                      search,
                      "products",
                      products
                        .map((product) =>
                          product.variants
                            ?.map((variant) => variant.sku)
                            .filter((sku) => sku !== null),
                        )
                        .join(","),
                    );
                  }}
                >
                  {!productsFilter ? (
                    <s-stack direction="inline">
                      <s-text>Фільтр товарів</s-text>
                      <s-icon type="caret-down" />
                    </s-stack>
                  ) : (
                    `Фільтр товарів: ${productsFilter.length}`
                  )}
                </s-clickable-chip>
              )}
              {!params.get("customerId") &&
                !(
                  paymentStatusFilterVisibility &&
                  fulfillmentStatusFilterVisibility &&
                  tagFilterVisibility &&
                  productsFilterVisibility
                ) && (
                  <s-clickable-chip
                    color="subdued"
                    commandFor="add-filter-popover"
                  >
                    <s-stack direction="inline">
                      <s-text
                        color={
                          state !== "idle" || nav.state !== "idle"
                            ? "subdued"
                            : "base"
                        }
                      >
                        Додати фільтр
                      </s-text>
                      <s-icon type="plus" />
                    </s-stack>
                  </s-clickable-chip>
                )}

              {(paymentStatusFilterVisibility ||
                fulfillmentStatusFilterVisibility ||
                tagFilterVisibility ||
                productsFilterVisibility) && (
                <s-clickable-chip
                  color="subdued"
                  onClick={() => {
                    setValue("paymentStatusesFilter", [], {
                      shouldDirty: true,
                    });
                    setValue("paymentStatusesFilterVisibility", false);
                    setValue("fulfillmentStatusesFilter", [], {
                      shouldDirty: true,
                    });
                    setValue("fulfillmentStatusesFilterVisibility", false);
                    setValue("tagFilter", "", { shouldDirty: true });
                    setValue("tagFilterVisibility", false);
                    setValue("productsFilter", [], { shouldDirty: true });
                    setValue("productsFilterVisibility", false);
                    params.set("paymentStatuses", "");
                    params.set("fulfillmentStatuses", "");
                    params.set("tag", "");
                    params.set("products", "");
                    navigate(`?${params.toString()}`);
                  }}
                >
                  <s-text tone="critical">Очистити все</s-text>
                </s-clickable-chip>
              )}
            </s-stack>
            <s-popover id="add-filter-popover">
              <s-stack direction="block">
                {!paymentStatusFilterVisibility && (
                  <s-clickable
                    padding="small-300"
                    paddingInlineStart="small-100"
                    commandFor="add-filter-popover"
                    onClick={() => {
                      setValue("paymentStatusesFilterVisibility", true);
                      params.set("paymentStatuses", "");
                    }}
                  >
                    Статус оплати
                  </s-clickable>
                )}
                {!fulfillmentStatusFilterVisibility && (
                  <s-clickable
                    padding="small-300"
                    paddingInlineStart="small-100"
                    commandFor="add-filter-popover"
                    onClick={() => {
                      setValue("fulfillmentStatusesFilterVisibility", true);
                      params.set("fulfillmetStatuses", "");
                    }}
                  >
                    Статус виконання
                  </s-clickable>
                )}
                {!tagFilterVisibility && (
                  <s-clickable
                    padding="small-300"
                    paddingInlineStart="small-100"
                    commandFor="add-filter-popover"
                    onClick={() => {
                      setValue("tagFilterVisibility", true);
                      params.set("tag", "");
                    }}
                  >
                    Позначено тегом
                  </s-clickable>
                )}
                {!productsFilterVisibility && (
                  <s-clickable
                    padding="small-300"
                    paddingInlineStart="small-100"
                    commandFor="add-filter-popover"
                    onClick={async (e) => {
                      setValue("productsFilterVisibility", true);
                      const selectedProducts = await shopify.resourcePicker({
                        type: "product",
                        multiple: true,
                        action: "select",
                      });

                      if (!selectedProducts) {
                        return;
                      }

                      const products = selectedProducts?.map((product) => ({
                        id: product.id,
                        variants: product.variants.map((variant) => ({
                          id: variant.id,
                          sku: variant.sku,
                        })),
                      }));
                      setValue("productsFilter", products, {
                        shouldDirty: true,
                      });
                      filter(
                        search,
                        "products",
                        products
                          .map((product) =>
                            product.variants
                              ?.map((variant) => variant.sku)
                              .filter((sku) => sku !== null),
                          )
                          .join(","),
                      );
                    }}
                  >
                    По товару
                  </s-clickable>
                )}
              </s-stack>
            </s-popover>
            <StatusesFilterSelector
              id="payment-status-popover"
              resourceName="paymentStatusesFilter"
              search={search}
              selectedStatuses={paymentStatusesFilter}
              setValue={setValue}
              searchDebounce={searchDebounce}
            />
            <StatusesFilterSelector
              id="fulfillment-status-popover"
              resourceName="fulfillmentStatusesFilter"
              search={search}
              selectedStatuses={fulfillmentStatusesFilter}
              setValue={setValue}
              searchDebounce={searchDebounce}
            />
            <s-popover id="tag-popover">
              <s-box padding="small-300">
                <s-text-field
                  label="Назва тегу"
                  labelAccessibilityVisibility="exclusive"
                  placeholder="Введіть назву тегу"
                  value={tagFilter}
                  onInput={(e) => {
                    setValue("tagFilter", e.currentTarget.value, {
                      shouldDirty: true,
                    });
                    searchDebounce(search, "tag", e.currentTarget.value);
                  }}
                  autocomplete="off"
                />
              </s-box>
              <s-box paddingInlineStart="small-100">
                <s-link
                  commandFor="tag-popover"
                  command="--hide"
                  onClick={() => {
                    setValue("tagFilterVisibility", false);
                    setValue("tagFilter", "", { shouldDirty: true });
                    params.delete("tag");
                    navigate(`?${params.toString()}`);
                  }}
                >
                  Очистити
                </s-link>
              </s-box>
            </s-popover>
          </s-stack>
        ) : (
          <s-stack direction="inline" gap="small-500">
            {filterTabs.map((fTab, i) => (
              <div key={`filter-tab-${i}`}>
                <s-button
                  id={fTab.title}
                  variant="tertiary"
                  commandFor={
                    optimisticTabTitle === selectedTabTitle &&
                    selectedTabTitle === fTab.title &&
                    selectedTabTitle !== "All"
                      ? `tab-manager-${i}`
                      : undefined
                  }
                  onClick={(e) => {
                    if (optimisticTabTitle !== fTab.title)
                      onTabClick(fTab.title);
                  }}
                >
                  <s-stack direction="inline" gap="small-500">
                    <s-text
                      type={
                        selectedTab.title === fTab.title ? "strong" : "generic"
                      }
                    >
                      {fTab.title}
                    </s-text>
                    {selectedTab.title === fTab.title &&
                      selectedTab.title !== "All" && (
                        <s-icon type="chevron-down" />
                      )}
                  </s-stack>
                </s-button>
                <TabManager i={i} />
              </div>
            ))}
            <s-button
              accessibilityLabel="create-new-tab-button"
              variant="tertiary"
              icon="plus"
              interestFor="create-new-tab-tooltip"
              commandFor="create-tab-modal"
            />
            <s-tooltip id="create-new-tab-tooltip">
              Створити нову вкладку
            </s-tooltip>
          </s-stack>
        )}
      </s-grid-item>

      <s-grid-item>
        <s-stack
          direction="inline"
          gap="small-200"
          alignItems="center"
          alignContent="center"
          justifyContent="end"
        >
          {isSearching ? (
            <>
              <s-button
                variant="tertiary"
                accessibilityLabel="cancel-search"
                disabled={isBusy || typingLock}
                onClick={() => {
                  setIsSearching(false);
                  if (isDirty || isDirtyParams) {
                    reset();
                    [
                      "search",
                      "paymentStatuses",
                      "fulfillmentStatuses",
                      "tag",
                      "products",
                      "sortDirection",
                      "sortKey",
                      "hydrated",
                    ].forEach((k) => params.delete(k));
                    navigate(location.pathname);
                  } else {
                    if (!paymentStatusesFilter.length)
                      setValue("paymentStatusesFilterVisibility", false);
                    if (!fulfillmentStatusesFilter.length)
                      setValue("fulfillmentStatusesFilterVisibility", false);
                    if (!tagFilter.length)
                      setValue("tagFilterVisibility", false);
                    if (!productsFilter.length)
                      setValue("productsFilterVisibility", false);
                  }
                }}
              >
                Скасувати
              </s-button>
              <s-button
                variant="secondary"
                loading={fetcher.state !== "idle"}
                disabled={
                  state !== "idle" || nav.state !== "idle" || typingLock
                }
                accessibilityLabel="save-search"
                onClick={() => {
                  if (isDirty) {
                    fetcher.submit(
                      {
                        title: selectedTab.title,
                        search: search,
                        paymentStatusesFilter: JSON.stringify(
                          paymentStatusesFilter,
                        ),
                        fulfillmentStatusesFilter: JSON.stringify(
                          fulfillmentStatusesFilter,
                        ),
                        tagFilter: tagFilter,
                        productsFilter: JSON.stringify(productsFilter),
                        sortDirection: sortDirection,
                        sortKey: sortKey,
                        action: "update",
                      },
                      { action: ".", method: "POST" },
                    );
                  } else {
                    setIsSearching(false);
                    if (!paymentStatusesFilter.length)
                      setValue("paymentStatusesFilterVisibility", false);
                    if (!fulfillmentStatusesFilter.length)
                      setValue("fulfillmentStatusesFilterVisibility", false);
                    if (!tagFilter.length)
                      setValue("tagFilterVisibility", false);
                    if (!productsFilter.length)
                      setValue("productsFilterVisibility", false);
                  }
                }}
              >
                Зберегти
              </s-button>
            </>
          ) : (
            <s-button
              variant="secondary"
              accessibilityLabel="save-search"
              icon={"search"}
              disabled={isBusy}
              onClick={() => setIsSearching(true)}
            >
              <s-icon type="filter" />
            </s-button>
          )}
          <s-button
            icon="sort"
            variant="secondary"
            accessibilityLabel="Sort"
            interestFor="sort-tooltip"
            commandFor="sort-popover"
            disabled={isBusy}
          />
          <s-button
            icon="refresh"
            variant="secondary"
            accessibilityLabel="Refresh"
            interestFor="refresh-tooltip"
            loading={state !== "idle"}
            disabled={nav.state !== "idle" || fetcher.state !== "idle"}
            onClick={() => revalidate()}
          />
          <s-tooltip id="refresh-tooltip">
            <s-text>Оновити</s-text>
          </s-tooltip>
          <s-tooltip id="sort-tooltip">
            <s-text>Сортувати</s-text>
          </s-tooltip>
          <s-popover id="sort-popover">
            <s-box padding="small-500">
              <s-stack direction="block" gap="small-500">
                <s-box padding="small-300" paddingInlineStart="small-100">
                  <s-choice-list
                    name="sort-key-choice-list"
                    label="Сортувати за"
                  >
                    <s-choice selected>Номер замовлення</s-choice>
                  </s-choice-list>
                </s-box>
                <s-divider />
                <s-stack direction="block" gap="small-500">
                  <s-clickable
                    padding="small-500"
                    commandFor="sort-popover"
                    background={
                      sortDirection === "asc" ? "strong" : "transparent"
                    }
                    onClick={() => {
                      setValue("sortDirection", "asc", {
                        shouldDirty: true,
                      });
                      filter(search, "sortDirection", "asc");
                    }}
                  >
                    <s-stack
                      direction="inline"
                      gap="small-500"
                      paddingInlineStart="small-100"
                    >
                      <s-icon type="sort-ascending" />
                      <s-text
                        type={sortDirection === "asc" ? "strong" : "generic"}
                      >
                        За зростанням
                      </s-text>
                    </s-stack>
                  </s-clickable>
                  <s-clickable
                    padding="small-500"
                    commandFor="sort-popover"
                    background={
                      sortDirection === "desc" ? "strong" : "transparent"
                    }
                    onClick={() => {
                      setValue("sortDirection", "desc", {
                        shouldDirty: true,
                      });
                      filter(search, "sortDirection", "desc");
                    }}
                  >
                    <s-stack
                      direction="inline"
                      gap="small-500"
                      paddingInlineStart="small-100"
                    >
                      <s-icon type="sort-descending" />
                      <s-text
                        type={sortDirection === "desc" ? "strong" : "generic"}
                      >
                        За спаданням
                      </s-text>
                    </s-stack>
                  </s-clickable>
                </s-stack>
              </s-stack>
            </s-box>
          </s-popover>
        </s-stack>
      </s-grid-item>
      <TabCreateModal toast={toast} />
      <TabRenameModal tabTitle={optimisticTabTitle} toast={toast} />
      <TabDublicateModal tabTitle={optimisticTabTitle} toast={toast} />
      <TabDeleteModal tabId={selectedTab.id} toast={toast} />
    </s-grid>
  );
}
