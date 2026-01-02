import { JsonValue } from "@prisma/client/runtime/library";
import { OrderSortKeys } from "app/types/admin.types";
import { STATE_KEYS } from "./server-functions";

export type Tab = {
  query: string;
  id: string;
  title: string;
  sort: string;
  filters: JsonValue;
};

export type SelectedProduct = {
  id: string;
  variants: {
    id: string | undefined;
    sku: string | null | undefined;
  }[];
};

export type FormValues = {
  search: string;
  paymentStatusesFilterVisibility: boolean;
  paymentStatusesFilter: string[];
  fulfillmentStatusesFilterVisibility: boolean;
  fulfillmentStatusesFilter: string[];
  tagFilterVisibility: boolean;
  tagFilter: string;
  productsFilterVisibility: boolean;
  productsFilter: SelectedProduct[];
  sortDirection: "asc" | "desc";
  sortKey: string;
};

export type PaymentStatus =
  | "Authorized"
  | "Expired"
  | "Paid"
  | "Pending"
  | "Partially paid"
  | "Refunded"
  | "Voided";

export type FulfillmentStatus = "shipped" | "unshipped" | "Partially fulfilled";

export type Filters = {
  paymentStatuses?: PaymentStatus[];
  fulfillmentStatuses?: FulfillmentStatus[];
  tag?: string;
  products?: SelectedProduct[];
};

export type EffectiveValues = {
  cursor: string | null;
  direction: "next" | "previous" | "search";
  quantity: number;

  search: string;

  sortKey: OrderSortKeys;
  sortDirection: "asc" | "desc";

  customerId?: string | null;
  paymentStatuses?: PaymentStatus[];
  fulfillmentStatuses?: FulfillmentStatus[];
  tag: string;
  productsSkus: string[];
};

export type PayloadFilters = {
  paymentStatuses?: PaymentStatus[];
  fulfillmentStatuses?: FulfillmentStatus[];
  tag?: string;
  products?: SelectedProduct[];
};

export type SortDirection = "asc" | "desc";

export type StateKey = (typeof STATE_KEYS)[number];

type ToastPayload = {
  status: "success" | "error" | "switched";
  message: string;
};

export type RedirectWithCookiesArgs = {
  url: URL;
  headers?: Headers;
  tab?: string;
  toast?: ToastPayload;
  tabCookie?: {
    serialize: (value: unknown) => Promise<string>;
  };
  toastCookie?: {
    serialize: (value: ToastPayload) => Promise<string>;
  };
};
