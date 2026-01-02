import type { LoaderFunctionArgs } from "react-router";
import { getRemainingProductsForFulfillment } from "~/graphql/queries";
import { authenticate } from "~/shopify.server";
import type { GetRemainingProductsForFulfillmentQuery } from "~/types/admin.generated";

type ItemToFulfill = {
  variantId: string;
  sku: string | null;
  displayName: string | null;
  imageUrl: string | null;
  remainingQuantity: number;
};

// Дістаємо типи вузлів із згенерованого Query (без any)
type OrderNode = NonNullable<GetRemainingProductsForFulfillmentQuery["order"]>;
type FulfillmentOrderNode = NonNullable<
  OrderNode["fulfillmentOrders"]
>["nodes"][number];
type LineItemNode = NonNullable<
  FulfillmentOrderNode["lineItems"]
>["nodes"][number];

export async function loader({ request }: LoaderFunctionArgs) {
  const { admin } = await authenticate.admin(request);

  const url = new URL(request.url);
  const orderId = url.searchParams.get("orderId");
  if (!orderId) throw new Response("Missing orderId", { status: 400 });

  const response = await admin.graphql(getRemainingProductsForFulfillment, {
    variables: { id: orderId },
  });

  // Типізуємо payload (json.data може бути undefined)
  const payload = (await response.json()) as {
    data?: GetRemainingProductsForFulfillmentQuery;
  };
  const orderData = payload.data;

  const itemsToFulfill = getItemsToFulfillWithImages(orderData);
  return { orderId, lineItems: itemsToFulfill };
}

function getItemsToFulfillWithImages(
  orderData: GetRemainingProductsForFulfillmentQuery | undefined,
): ItemToFulfill[] {
  const fulfillmentOrders: FulfillmentOrderNode[] =
    orderData?.order?.fulfillmentOrders?.nodes ?? [];

  const map = new Map<string, ItemToFulfill>(); // key = variantId

  for (const fo of fulfillmentOrders) {
    const lineItems: LineItemNode[] = fo?.lineItems?.nodes ?? [];

    for (const li of lineItems) {
      const qty = li?.remainingQuantity ?? 0;
      if (qty <= 0) continue;

      const v = li?.variant;
      if (!v?.id) continue;

      const key = v.id;

      const existing = map.get(key);
      if (!existing) {
        map.set(key, {
          variantId: v.id,
          sku: v.sku ?? null,
          displayName: v.displayName ?? null,
          imageUrl: li.image?.url ?? null,
          remainingQuantity: qty,
        });
      } else {
        existing.remainingQuantity += qty;

        if (!existing.imageUrl) {
          existing.imageUrl = li.image?.url ?? null;
        }
      }
    }
  }

  return Array.from(map.values()).sort((a, b) =>
    (a.sku || a.displayName || "").localeCompare(b.sku || b.displayName || ""),
  );
}
