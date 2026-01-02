import React, { useCallback, useEffect } from "react";
import { useFetcher } from "react-router";
import { loader } from "~/routes/api.get-products-for-fulfillment";

type Props = { orderId: string; i: number };

export default function ProductsPopover({ orderId, i }: Props) {
  const fetcher = useFetcher<typeof loader>();

  const isCurrent = fetcher.data?.orderId === orderId;
  const isLoading = fetcher.state !== "idle";

  const shouldShowProducts = isCurrent && !isLoading;

  const loadOnce = useCallback(() => {
    if (fetcher.data) return;
    if (fetcher.state !== "idle") return;

    fetcher.load(`/api/get-products-for-fulfillment?orderId=${orderId}`);
  }, [fetcher, orderId]);

  return (
    <s-popover id={`products-popover-${i}`} onShow={loadOnce}>
      <s-box padding="base">
        {!shouldShowProducts ? (
          <s-spinner />
        ) : (
          <s-stack direction="block">
            {fetcher.data &&
              fetcher.data?.lineItems.map((product, i) => (
                <s-stack key={i} direction="inline" gap="small-300">
                  <s-stack key={i} direction="inline" gap="small-300">
                    <div
                      style={{ position: "relative", display: "inline-block" }}
                    >
                      <s-thumbnail
                        src={product.imageUrl ?? undefined}
                        size="small"
                      />

                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          transform: "translate(50%, -40%)", // трохи назовні як на скріні
                          pointerEvents: "none", // щоб не заважав клікам по thumbnail
                        }}
                      >
                        <s-badge>{product.remainingQuantity}</s-badge>
                      </div>
                    </div>
                  </s-stack>
                  <s-stack
                    direction="block"
                    gap="small-300"
                    justifyContent="center"
                  >
                    <s-heading>{product.displayName}</s-heading>
                    <s-text>{product.sku}</s-text>
                  </s-stack>
                </s-stack>
              ))}
          </s-stack>
        )}
      </s-box>
    </s-popover>
  );
}
