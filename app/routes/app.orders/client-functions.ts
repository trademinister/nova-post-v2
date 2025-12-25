import type { Filters, FormValues, SortDirection } from "./types";

function parseSort(sort?: string): {
  sortKey: string;
  sortDirection: SortDirection;
} {
  const [sortKey = "", dir = "asc"] = String(sort ?? "").split(",");
  return { sortKey, sortDirection: dir === "desc" ? "desc" : "asc" };
}

function asArray<T>(v: unknown): v is T[] {
  return Array.isArray(v);
}

export function tabToFormValues(selectedTab: {
  query?: string | null;
  filters?: unknown;
  sort?: string | null;
}): FormValues {
  const filters = (selectedTab.filters ?? {}) as Filters;

  const paymentStatuses = asArray<string>(filters.paymentStatuses)
    ? filters.paymentStatuses
    : [];

  const fulfillmentStatuses = asArray<string>(filters.fulfillmentStatuses)
    ? filters.fulfillmentStatuses
    : [];

  const tag = typeof filters.tag === "string" ? filters.tag : "";

  const products = asArray<unknown>(filters.products) ? filters.products : [];

  const { sortKey, sortDirection } = parseSort(selectedTab.sort ?? "");

  return {
    search: selectedTab.query ?? "",
    paymentStatusesFilterVisibility: paymentStatuses.length > 0,
    paymentStatusesFilter: paymentStatuses,
    fulfillmentStatusesFilterVisibility: fulfillmentStatuses.length > 0,
    fulfillmentStatusesFilter: fulfillmentStatuses,
    tagFilterVisibility: tag.length > 0,
    tagFilter: tag,
    productsFilterVisibility: products.length > 0,
    productsFilter: products,
    sortDirection,
    sortKey,
  };
}
