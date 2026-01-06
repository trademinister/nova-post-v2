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

export default function TabDublicateModal({ tabTitle, toast }: Props) {
  const fetcher = useFetcher<typeof action>();
  const [title, setTitle] = useState(`copy_of ${tabTitle}`);
  const [titleError, setTitleError] = useState("");
  const modalRef = useRef(null);
  const { t } = useTranslation(["global"]);

  useEffect(() => {
    setTitle(`copy_of ${tabTitle}`);
  }, [tabTitle]);

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

  return (
    <s-modal
      ref={modalRef}
      id="dublicate-tab-modal"
      heading={t("modals.dublicate-tab.heading")}
      onAfterHide={() => {
        setTitle(`copy_of ${tabTitle}`);
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
        commandFor="dublicate-tab-modal"
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
            { title, originTitle: tabTitle, action: "dublicate" },
            { action: ".", method: "POST" },
          )
        }
      >
        {t("buttons.save")}
      </s-button>
    </s-modal>
  );
}
