import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import { loader } from "./route";

export default function NovaPoshtaFfSettings() {
  const { t } = useTranslation(["settings", "global"]);

  const {} = useLoaderData<typeof loader>();
  const {
    watch,
    setValue,
    reset,
    getValues,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      npLogin: "",
      npPassword: "",
      npOrganization: "",
    },
  });

  useEffect(() => {
    if (isDirty) {
      reset(getValues());
    }
  }, [isDirty, getValues, reset]);

  return (
    <s-page heading={t("page_title")} inlineSize="base">
      <s-section>asd</s-section>
      <s-section slot="aside" heading={t("login_title")}>
        <s-grid gridTemplateColumns="repeat(2, 1fr)" gap="base">
          <s-grid-item>
            <s-text-field
              name="npLogin"
              label={t("npLogin_label")}
              value={watch("npLogin")}
              onChange={(e) => setValue("npLogin", e.currentTarget.value)}
            />
          </s-grid-item>
          <s-grid-item>
            <s-text-field
              name="npPassword"
              label={t("npPassword_label")}
              value={watch("npPassword")}
              onChange={(e) => setValue("npPassword", e.currentTarget.value)}
            />
          </s-grid-item>
        </s-grid>
        <s-text-field
          name="npOrganization"
          label={t("npOrganization_label")}
          value={watch("npOrganization")}
          onChange={(e) => setValue("npOrganization", e.currentTarget.value)}
        />
      </s-section>
    </s-page>
  );
}
