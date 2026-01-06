import { action } from "app/routes/app._index/route";
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation(["global"]);

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
      heading={t("modals.delete-tab-confirmation.heading")}
    >
      <s-text>
        {t("modals.delete-tab-confirmation.description")}
      </s-text>
      <s-button
        slot="secondary-actions"
        commandFor="tab-delete-confirmation-modal"
        command="--hide"
      >
        {t("buttons.cancel")}
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
        {t("buttons.confirm")}
      </s-button>
    </s-modal>
  );
}
