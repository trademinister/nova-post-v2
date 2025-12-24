import { redirect } from "react-router";
import {
  EffectiveValues,
  Filters,
  FulfillmentStatus,
  PaymentStatus,
  RedirectWithCookiesArgs,
  StateKey,
  Tab,
} from "./types";
import { OrderSortKeys } from "app/types/admin.types";
import { GetPaginatedOrdersQueryVariables } from "app/types/admin.generated";

export function canonicalRedirect(
  url: URL,
  selectedTab: Tab,
  tabFilters: Filters,
): Response | null {
  const hydrated = url.searchParams.get("hydrated") === "1";

  const hasAnyCanonicalParam =
    url.searchParams.has("search") ||
    url.searchParams.has("paymentStatuses") ||
    url.searchParams.has("fulfillmentStatuses") ||
    url.searchParams.has("products") ||
    url.searchParams.has("tag") ||
    url.searchParams.has("sortKey") ||
    url.searchParams.has("sortDirection") ||
    url.searchParams.has("quantity");

  if (hydrated || hasAnyCanonicalParam) {
    return null;
  }

  const params = new URLSearchParams(url.searchParams);

  params.delete("cursor");
  params.delete("direction");

  // search
  if (selectedTab.query) params.set("search", selectedTab.query);
  else params.delete("search");

  // paymentStatuses
  if (tabFilters.paymentStatuses?.length) {
    params.set("paymentStatuses", tabFilters.paymentStatuses.join(","));
  } else {
    params.delete("paymentStatuses");
  }

  // fulfillmentStatuses
  if (tabFilters.fulfillmentStatuses?.length) {
    params.set("fulfillmentStatuses", tabFilters.fulfillmentStatuses.join(","));
  } else {
    params.delete("fulfillmentStatuses");
  }

  // products (SKUs)
  const skus =
    tabFilters.products
      ?.flatMap((p) => p.variants)
      .map((v) => v.sku)
      .filter(
        (sku): sku is string => typeof sku === "string" && sku.length > 0,
      ) || [];

  if (skus.length) params.set("products", skus.join(","));
  else params.delete("products");

  // tag
  if (tabFilters.tag) params.set("tag", tabFilters.tag);
  else params.delete("tag");

  // sortKey + sortDirection
  const [sortKeyFromTab, sortDirFromTab] = (
    selectedTab.sort || "ORDER_NUMBER,desc"
  ).split(",");

  if (sortKeyFromTab) params.set("sortKey", sortKeyFromTab);
  else params.delete("sortKey");

  if (sortDirFromTab) params.set("sortDirection", sortDirFromTab);
  else params.delete("sortDirection");

  // quantity
  params.set("quantity", params.get("quantity") || "4");

  // анти-луп
  params.set("hydrated", "1");

  return redirect(`${url.pathname}?${params.toString()}`);
}

export function getEffectiveValues(
  url: URL,
  selectedTab: Tab,
  tabFilters: Filters,
  opts?: { mode?: "urlOnly" | "fallbackToDb" },
): EffectiveValues {
  const mode = opts?.mode ?? "fallbackToDb";

  const cursor = url.searchParams.get("cursor");
  const direction =
    (url.searchParams.get("direction") as "next" | "previous" | "search") ||
    "search";

  const quantity = Number(url.searchParams.get("quantity") || 4);

  const searchParam = url.searchParams.get("search");

  const sortKeyParam = url.searchParams.get("sortKey");
  const sortDirectionParam = url.searchParams.get("sortDirection") as
    | "asc"
    | "desc"
    | null;

  const [sortKeyFromTab, sortDirectionFromTab] = (
    selectedTab.sort || "ORDER_NUMBER,desc"
  ).split(",");

  const sortKey: OrderSortKeys =
    (sortKeyParam as OrderSortKeys) ||
    (mode === "fallbackToDb"
      ? (sortKeyFromTab as OrderSortKeys) || "ORDER_NUMBER"
      : "ORDER_NUMBER");

  const sortDirection: "asc" | "desc" =
    sortDirectionParam ||
    (mode === "fallbackToDb"
      ? (sortDirectionFromTab as "asc" | "desc") || "desc"
      : "desc");

  const paymentStatusesParam = url.searchParams.get("paymentStatuses");
  const fulfillmentStatusesParam = url.searchParams.get("fulfillmentStatuses");
  const tagParam = url.searchParams.get("tag");
  const productsSkusParam = url.searchParams.get("products");

  const search =
    searchParam ?? (mode === "fallbackToDb" ? (selectedTab.query ?? "") : "");

  const paymentStatuses =
    paymentStatusesParam !== null && paymentStatusesParam.length > 0
      ? (paymentStatusesParam.split(",") as PaymentStatus[])
      : mode === "fallbackToDb"
        ? tabFilters.paymentStatuses
        : undefined;

  const fulfillmentStatuses =
    fulfillmentStatusesParam !== null && fulfillmentStatusesParam.length > 0
      ? (fulfillmentStatusesParam.split(",") as FulfillmentStatus[])
      : mode === "fallbackToDb"
        ? tabFilters.fulfillmentStatuses
        : undefined;

  const tag =
    tagParam ?? (mode === "fallbackToDb" ? (tabFilters.tag ?? "") : "");

  const productsSkus: string[] = (() => {
    if (typeof productsSkusParam === "string" && productsSkusParam.length > 0) {
      return productsSkusParam.split(",");
    }
    if (mode === "fallbackToDb" && tabFilters?.products?.length) {
      return tabFilters.products
        .flatMap((product) => product.variants)
        .map((variant) => variant.sku)
        .filter((sku): sku is string => typeof sku === "string");
    }
    return [];
  })();

  return {
    cursor,
    direction,
    quantity,
    search,
    sortKey,
    sortDirection,
    paymentStatuses,
    fulfillmentStatuses,
    tag,
    productsSkus,
  };
}

export function createVariables({
  cursor,
  direction,
  search,
  sortDirection,
  sortKey,
  paymentStatuses,
  fulfillmentStatuses,
  tag,
  productsSkus,
  quantity,
}: EffectiveValues) {
  // Базові змінні для GraphQl запиту
  let variables: GetPaginatedOrdersQueryVariables = {
    query: "",
    reverse: sortDirection === "desc",
    sortKey,
  };
  // Пагінація
  variables =
    direction === "previous"
      ? { ...variables, last: quantity, before: cursor ?? undefined }
      : {
          ...variables,
          first: quantity,
          after: direction === "next" ? (cursor ?? undefined) : undefined,
        };

  const clauses: string[] = [];

  if (search) clauses.push(search);

  const normalizeEnum = (s: string) => s.replace(" ", "_").toLowerCase();

  if (paymentStatuses?.length) {
    const q = paymentStatuses
      .map((s) => `(financial_status:${normalizeEnum(s)})`)
      .join(" OR ");
    clauses.push(`(${q})`);
  }

  if (fulfillmentStatuses?.length) {
    const q = fulfillmentStatuses
      .map((s) => `(fulfillment_status:${normalizeEnum(s)})`)
      .join(" OR ");
    clauses.push(`(${q})`);
  }

  if (tag) {
    clauses.push(`(tag:${tag})`);
  }

  if (productsSkus.length) {
    const q = productsSkus.map((sku) => `sku:${sku}`).join(" OR ");
    clauses.push(`(${q})`);
  }

  variables.query = clauses.join(" AND ");

  return variables;
}

export const STATE_KEYS = [
  "search",
  "paymentStatuses",
  "fulfillmentStatuses",
  "products",
  "tag",
  "sortKey",
  "sortDirection",
  "quantity",
] as const;

function normStr(v: string | null): string {
  return (v ?? "").trim();
}

function normList(v: string | null): string {
  if (!v) return "";
  return v
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .sort()
    .join(",");
}

function dbValueForKey(
  key: StateKey,
  selectedTab: Tab,
  tabFilters: Filters,
): string {
  switch (key) {
    case "search":
      return normStr(selectedTab.query);

    case "paymentStatuses":
      return tabFilters.paymentStatuses?.length
        ? [...tabFilters.paymentStatuses].sort().join(",")
        : "";

    case "fulfillmentStatuses":
      return tabFilters.fulfillmentStatuses?.length
        ? [...tabFilters.fulfillmentStatuses].sort().join(",")
        : "";

    case "products": {
      const skus =
        tabFilters.products
          ?.flatMap((p) => p.variants || [])
          ?.map((v) => v.sku)
          ?.filter(
            (sku): sku is string => typeof sku === "string" && sku.length > 0,
          ) || [];
      return skus.length ? [...skus].sort().join(",") : "";
    }

    case "tag":
      return normStr(tabFilters?.tag || "");

    case "sortKey": {
      const [sortKey] = (selectedTab.sort || "ORDER_NUMBER,desc").split(",");
      return normStr(sortKey) || "ORDER_NUMBER";
    }

    case "sortDirection": {
      const [, dir] = (selectedTab.sort || "ORDER_NUMBER,desc").split(",");
      const v = normStr(dir) || "desc";
      return v === "asc" ? "asc" : "desc";
    }

    case "quantity":
      return "4";
  }
}

function urlValueForKey(key: StateKey, url: URL): string {
  const raw = url.searchParams.get(key);

  switch (key) {
    case "paymentStatuses":
    case "fulfillmentStatuses":
    case "products":
      return normList(raw);

    case "search":
    case "tag":
    case "sortKey":
    case "sortDirection":
      return normStr(raw);

    case "quantity": {
      const v = normStr(raw);
      return v || "4";
    }
  }
}

export function getDirtyParams(
  url: URL,
  selectedTab: Tab,
  tabFilters: Filters,
): StateKey[] {
  const dirty: StateKey[] = [];

  for (const key of STATE_KEYS) {
    const u = urlValueForKey(key, url);
    const d = dbValueForKey(key, selectedTab, tabFilters);
    if (u !== d) dirty.push(key);
  }

  return dirty;
}

export function isDirty(
  url: URL,
  selectedTab: Tab,
  tabFilters: Filters,
): boolean {
  return getDirtyParams(url, selectedTab, tabFilters).length > 0;
}

export function clearParams(url: URL) {
  const params = new URLSearchParams(url.searchParams);

  for (const k of [
    "search",
    "paymentStatuses",
    "fulfillmentStatuses",
    "products",
    "tag",
    "sortKey",
    "sortDirection",
    "quantity",
    "cursor",
    "direction",
    "hydrated",
  ]) {
    params.delete(k);
  }

  return params;
}

export async function redirectWithCookies({
  url,
  headers = new Headers(),
  tab,
  toast,
  tabCookie,
  toastCookie,
}: RedirectWithCookiesArgs) {
  if (tab && tabCookie) {
    headers.append("Set-Cookie", await tabCookie.serialize({ tab }));
  }

  if (toast && toastCookie) {
    headers.append("Set-Cookie", await toastCookie.serialize(toast));
  }

  const nextUrl = `${url.pathname}?${url.searchParams.toString()}`;

  return redirect(nextUrl, { headers });
}
