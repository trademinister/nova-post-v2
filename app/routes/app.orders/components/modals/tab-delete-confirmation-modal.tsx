import { action } from "app/routes/app._index/route";
import React, { useEffect, useRef } from "react";
import { useFetcher, useNavigate } from "react-router";

type Props = {
  tabId: string;
  toast:
    | {
        status: "success" | "error" | "switched";
        message: string;
      }
    | undefined;
};

export default function TabDeleteModal({ tabId, toast }: Props) {
  const fetcher = useFetcher<typeof action>({ key: "tab-manager" });
  const modalRef = useRef(null);

  useEffect(() => {
    if (toast?.status === "success") {
      //@ts-ignore
      modalRef?.current?.hideOverlay();
      shopify.toast.show(toast.message);
    } else if (toast?.status === "error") {
      shopify.toast.show(toast.message, { isError: true });
    }
  }, [toast]);

  return (
    <s-modal
      ref={modalRef}
      id="tab-delete-confirmation-modal"
      heading="Підтвердження"
    >
      <s-text>
        Цю дію неможливо скасувати. Ця вкладка більше не буде доступна.
      </s-text>
      <s-button
        slot="secondary-actions"
        commandFor="tab-delete-confirmation-modal"
        command="--hide"
      >
        Скасувати
      </s-button>
      <s-button
        slot="primary-action"
        variant="primary"
        tone="critical"
        loading={fetcher.state !== "idle"}
        onClick={() => {
          fetcher.submit(
            { tabId, action: "delete" },
            { action: ".", method: "POST" },
          );
        }}
      >
        Підтвердити
      </s-button>
    </s-modal>
  );
}
