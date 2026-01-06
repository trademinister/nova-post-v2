import { action } from "app/routes/app._index/route";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useFetcher, useSubmit } from "react-router";

type Props = {
  tabTitle: string;
  toast:
    | {
        status: "success" | "error" | "switched";
        message: string;
      }
    | undefined;
};

export default function TabRenameModal({ tabTitle, toast }: Props) {
  const fetcher = useFetcher<typeof action>();
  const [title, setTitle] = useState(tabTitle);
  const [titleError, setTitleError] = useState("");
  const modalRef = useRef(null);
  const { t } = useTranslation(["global"]);

  useEffect(() => {
    if (toast?.status === "success") {
      //@ts-ignore
      modalRef?.current?.hideOverlay();
      shopify.toast.show(toast.message);
    } else if (toast?.status === "error") {
      setTitleError(toast.message);
      shopify.toast.show(t("errors.general"), { isError: true });
    }
  }, [toast]);

  useEffect(() => {
    setTitle(tabTitle);
  }, [tabTitle]);

  return (
    <s-modal
      ref={modalRef}
      id="rename-tab-modal"
      heading={t("modals.rename-tab.heading")}
      onHide={() => {
        setTitle(tabTitle);
        setTitleError("");
      }}
    >
      <s-grid gridTemplateColumns="repeat(12, 1fr)" gap="base">
        <s-grid-item gridColumn="span 12" gridRow="span 1">
          <s-text-field
            label="Назва"
            minLength={40}
            maxLength={40}
            error={titleError}
            value={title}
            onInput={(e) => {
              if (!e.currentTarget.value) {
                setTitleError(t("errors.field_required"));
              } else {
                setTitleError("");
              }
              setTitle(e.currentTarget.value);
            }}
            autocomplete="off"
          />
        </s-grid-item>
      </s-grid>
      <s-button
        slot="secondary-actions"
        commandFor="rename-tab-modal"
        command="--hide"
      >
        {t("buttons.cancel")}
      </s-button>
      <s-button
        slot="primary-action"
        variant="primary"
        disabled={titleError ? true : false}
        loading={fetcher.state !== "idle"}
        onClick={() =>
          fetcher.submit(
            { title, oldTitle: tabTitle, action: "rename" },
            { action: ".", method: "POST" },
          )
        }
      >
        {t("buttons.save")}
      </s-button>
    </s-modal>
  );
}
