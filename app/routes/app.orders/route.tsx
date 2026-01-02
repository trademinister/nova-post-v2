import { Prisma } from "@prisma/client";
import { tabCookie, toastCookie } from "app/cookies.server";
import prisma from "app/db.server";
import { getPaginatedOrders } from "app/graphql/queries";
import { authenticate } from "app/shopify.server";
import {
  ActionFunctionArgs,
  data,
  LoaderFunctionArgs,
  redirect,
} from "react-router";
import { URL } from "url";
import AppPage from "./app.orders";
import { Filters, PayloadFilters, Tab } from "./types";
import {
  canonicalRedirect,
  clearParams,
  createVariables,
  getDirtyParams,
  getEffectiveValues,
  redirectWithCookies,
} from "./server-functions";

export { AppPage as default };

export async function loader({ request }: LoaderFunctionArgs) {
  const { admin, session } = await authenticate.admin(request);

  const url = new URL(request.url);

  // Кукі та вкладка
  const cookie = request.headers.get("Cookie");
  const tabTitle = ((await tabCookie.parse(cookie))?.tab as string) || "All";
  const toast = (await toastCookie.parse(cookie)) as
    | { status: "success" | "error" | "switched"; message: string }
    | undefined;

  const filterTabs = await prisma.filterTab.findMany({
    where: { sessionId: session.id },
    select: { id: true, title: true, query: true, sort: true, filters: true },
    orderBy: { created: "asc" },
  });

  let selectedTab: Tab;

  if (filterTabs.length === 0) {
    selectedTab = await prisma.filterTab.create({
      data: {
        title: tabTitle,
        filters: {},
        session: { connect: { id: session.id } },
      },
      select: { id: true, title: true, query: true, sort: true, filters: true },
    });
  } else {
    const tab = filterTabs.find((t) => t.title === tabTitle);

    if (!tab) {
      return new Response(
        JSON.stringify({ status: "error", message: "Вкладка не знайдена" }),
        { headers: { "Content-Type": "application/json" } },
      );
    }

    selectedTab = tab;
  }

  const tabFilters = (selectedTab.filters || {}) as PayloadFilters;

  const needRedirect = canonicalRedirect(url, selectedTab, tabFilters);

  if (needRedirect) {
    return needRedirect;
  }

  const dirtyKeys = getDirtyParams(url, selectedTab, tabFilters);

  const {
    cursor,
    direction,
    search,
    sortDirection,
    sortKey,
    customerId,
    paymentStatuses,
    fulfillmentStatuses,
    tag,
    productsSkus,
    quantity,
  } = getEffectiveValues(url, selectedTab, tabFilters, { mode: "urlOnly" });

  const variables = createVariables({
    cursor,
    direction,
    search,
    sortDirection,
    sortKey,
    customerId,
    paymentStatuses,
    fulfillmentStatuses,
    tag,
    productsSkus,
    quantity,
  });

  console.log(variables);

  const response = await admin.graphql(getPaginatedOrders, { variables });
  const json = await response.json();
  const orderData = json.data;

  const headers = new Headers();
  if (toast) {
    headers.append(
      "Set-Cookie",
      await toastCookie.serialize("", { maxAge: 0 }),
    );
  }

  return data(
    {
      orders: orderData?.orders,
      filterTabs: filterTabs.length > 0 ? filterTabs : [selectedTab],
      selectedTabTitle: selectedTab.title,
      isDirty: {
        isDirty: dirtyKeys.length > 0,
        keys: dirtyKeys,
      },
      state: {
        search,
        paymentStatuses: paymentStatuses ?? [],
        fulfillmentStatuses: fulfillmentStatuses ?? [],
        tag,
        products: productsSkus,
        sortKey,
        sortDirection,
        quantity,
        cursor,
        direction,
      },
      toast,
    },
    { headers },
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const { session } = await authenticate.admin(request);
  const url = new URL(request.url);
  const formData = await request.formData();
  const title = formData.get("title") as string;

  switch (formData.get("action")) {
    case "create": {
      const existingTab = await prisma.filterTab.findUnique({
        where: {
          FilterTab_sessionId_title_key: {
            title,
            sessionId: session.id,
          },
        },
      });

      if (existingTab) {
        return redirectWithCookies({
          url,
          tab: title,
          toast: {
            status: "error",
            message: "Вкладка з такою назвою вже існує",
          },
          tabCookie,
          toastCookie,
        });
      }

      await prisma.filterTab.create({
        data: {
          title,
          filters: {},
          session: { connect: { id: session.id } },
        },
      });

      return redirectWithCookies({
        url,
        tab: title,
        toast: {
          status: "success",
          message: "Вкладка створена",
        },
        tabCookie,
        toastCookie,
      });
    }
    case "update": {
      const search = formData.get("search") as string;
      const paymentStatusesFilter = formData.get("paymentStatusesFilter") as
        | string
        | null;
      const fulfillmentStatusesFilter = formData.get(
        "fulfillmentStatusesFilter",
      ) as string | null;
      const tagFilter = formData.get("tagFilter") as string | null;
      const productsFilter = formData.get("productsFilter") as string | null;
      const sortDirection = formData.get("sortDirection") as "asc" | "desc";
      const sortKey = formData.get("sortKey") as string;
      const products = productsFilter ? JSON.parse(productsFilter) : [];

      const filters: Filters = {
        ...(paymentStatusesFilter &&
          JSON.parse(paymentStatusesFilter).length > 0 && {
            paymentStatuses: JSON.parse(paymentStatusesFilter),
          }),
        ...(fulfillmentStatusesFilter &&
          JSON.parse(fulfillmentStatusesFilter).length > 0 && {
            fulfillmentStatuses: JSON.parse(fulfillmentStatusesFilter),
          }),
        ...(tagFilter && { tag: tagFilter }),
        ...(products.length > 0 && { products: products }),
      };

      await prisma.filterTab.update({
        where: {
          FilterTab_sessionId_title_key: {
            title,
            sessionId: session.id,
          },
        },
        data: {
          filters: filters,
          sort: `${sortKey},${sortDirection}`,
          query: search,
          title: title,
        },
      });

      return redirectWithCookies({
        url,
        tab: title,
        toast: {
          status: "success",
          message: "Вкладка оновлена",
        },
        tabCookie,
        toastCookie,
      });
    }
    case "delete": {
      const tabId = formData.get("tabId") as string;

      if (!tabId) {
        return redirectWithCookies({
          url,
          tab: title,
          toast: {
            status: "error",
            message: "Виникла помилка",
          },
          tabCookie,
          toastCookie,
        });
      }

      await prisma.filterTab.delete({ where: { id: tabId } });

      return redirectWithCookies({
        url,
        tab: "All",
        toast: {
          status: "success",
          message: "Вкладка видалена",
        },
        tabCookie,
        toastCookie,
      });
    }
    case "switch": {
      const tab = formData.get("tab") as string;

      const dbTab = await prisma.filterTab.findUnique({
        where: {
          FilterTab_sessionId_title_key: { title: tab, sessionId: session.id },
        },
      });

      if (!dbTab) {
        return redirect(url.pathname, {
          headers: { "Set-Cookie": await tabCookie.serialize({ tab }) },
        });
      }

      const tabFilters = (dbTab.filters || {}) as Filters;
      const params = new URLSearchParams(url.searchParams);

      params.delete("cursor");
      params.delete("direction");

      // search
      if (dbTab.query) params.set("search", dbTab.query);

      // paymentStatuses
      if (
        Array.isArray(tabFilters.paymentStatuses) &&
        tabFilters.paymentStatuses.length
      ) {
        params.set("paymentStatuses", tabFilters.paymentStatuses.join(","));
      }

      // fulfillmentStatuses
      if (
        Array.isArray(tabFilters.fulfillmentStatuses) &&
        tabFilters.fulfillmentStatuses.length
      ) {
        params.set(
          "fulfillmentStatuses",
          tabFilters.fulfillmentStatuses.join(","),
        );
      }

      // products (SKUs)
      const skus =
        tabFilters.products
          ?.flatMap((product) => product.variants || [])
          ?.map((variant) => variant.sku)
          ?.filter(
            (sku): sku is string => typeof sku === "string" && sku.length > 0,
          ) || [];

      if (skus.length) {
        params.set("products", skus.join(","));
      }

      // tag
      if (tabFilters.tag) params.set("tag", tabFilters.tag);

      // sortDirection
      const [sortKey, sortDir] = String(dbTab.sort || "").split(",");
      if (sortDir) params.set("sortDirection", sortDir);

      if (sortKey) params.set("sortKey", sortKey);

      // quantity
      params.set("quantity", "4");

      params.set("hydrated", "1");

      return redirectWithCookies({
        url,
        tab: tab,
        toast: {
          status: "switched",
          message: "",
        },
        tabCookie,
        toastCookie,
      });
    }
    case "dublicate": {
      const originTitle = formData.get("originTitle") as string;

      const originTab = await prisma.filterTab.findUnique({
        where: {
          FilterTab_sessionId_title_key: {
            title: originTitle,
            sessionId: session.id,
          },
        },
      });

      if (!originTab) {
        return redirectWithCookies({
          url,
          tab: "All",
          toast: {
            status: "error",
            message: "Оригінальна вкладка не існує",
          },
          tabCookie,
          toastCookie,
        });
      }

      const existingTab = await prisma.filterTab.findUnique({
        where: {
          FilterTab_sessionId_title_key: {
            title: title,
            sessionId: session.id,
          },
        },
      });
      if (existingTab) {
        return redirectWithCookies({
          url,
          tab: title,
          toast: {
            status: "error",
            message: "Вкладка з таким іменем вже існує",
          },
          tabCookie,
          toastCookie,
        });
      }

      const dublicatedTab = await prisma.filterTab.create({
        data: {
          title: title,
          filters: (originTab.filters ??
            {}) as unknown as Prisma.InputJsonValue,
          query: originTab.query,
          sort: originTab.sort,
          session: { connect: { id: session.id } },
        },
      });

      return redirectWithCookies({
        url,
        tab: dublicatedTab.title,
        toast: {
          status: "success",
          message: "Вкладка-дублікат створена",
        },
        tabCookie,
        toastCookie,
      });
    }
    case "rename": {
      const oldTitle = formData.get("oldTitle") as string;
      const exTab = await prisma.filterTab.findUnique({
        where: {
          FilterTab_sessionId_title_key: {
            title: title,
            sessionId: session.id,
          },
        },
      });
      if (exTab) {
        return redirectWithCookies({
          url,
          tab: oldTitle,
          toast: {
            status: "error",
            message: "Вкладка з таким іменем вже існує",
          },
          tabCookie,
          toastCookie,
        });
      }

      const renamedTab = await prisma.filterTab.update({
        where: {
          FilterTab_sessionId_title_key: {
            title: oldTitle,
            sessionId: session.id,
          },
        },
        data: {
          title,
        },
      });

      return redirectWithCookies({
        url,
        tab: renamedTab.title,
        toast: {
          status: "success",
          message: "Вкладка переіменована",
        },
        tabCookie,
        toastCookie,
      });
    }
    default:
      return { status: "error", message: "Метод не підтримується" };
  }
}
