import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import {
  Form,
  useActionData,
  useFetcher,
  useLoaderData,
  useNavigate,
  useNavigation,
  useSearchParams,
} from "react-router";
import { action, loader } from "./route";

export default function NovaPoshtaFfSettings() {
  const { t } = useTranslation(["autoff_settings", "global"]);
  const {
    ffSettings,
    ffPaymentMethods,
    ffLocations,
    ffCollections,
    ffFilteredTags,
  } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  const navigate = useNavigate();
  const navigation = useNavigation();

  const [searchParams] = useSearchParams();
  const locationsOrderBy = searchParams.get("locationsOrderBy") || "name";
  const collectionsOrderBy = searchParams.get("collectionsOrderBy") || "name";
  const fetcherLogin = useFetcher<typeof action>();
  const fetcherSaveSettings = useFetcher<typeof action>();
  const fetcherPaymentMethod = useFetcher<typeof action>();
  const fetcherResetSettings = useFetcher<typeof action>();
  const fetcherFilteredTag = useFetcher<typeof action>();

  const [filteredTagValue, setFilteredTagValue] = useState("");
  const [filteredTagTypes, setFilteredTagTypes] = useState<string[]>(["order"]);
  const [paymentMethodName, setPaymentMethodName] = useState("");
  const [showOrganizationTooltip, setShowOrganizationTooltip] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      npLogin: ffSettings?.npLogin,
      npPassword: ffSettings?.npPassword,
      npOrganization: ffSettings?.npOrganization,
      additionalOrganizationKey: ffSettings?.additionalOrganizationKey,
    },
  });

  const {
    handleSubmit: mainHandleSubmit,
    reset: mainReset,
    watch: mainWatch,
    setValue: setMainValue,
    getValues: mainGetValues,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      isEnabled: ffSettings?.isEnabled,
      processPaymentgMethod: ffSettings?.processPaymentgMethod,
      orderRiskAssissemnt: ffSettings?.orderRiskAssissemnt,
      orderRiskLevels: ffSettings?.orderRiskLevels,
      filteredByTagsIsActive: ffSettings?.filteredByTagsIsActive,
      fulfillBy: ffSettings?.fulfillBy,
      filteredTags:
        ffFilteredTags?.map((tag) => ({
          id: tag.id,
          value: tag.value,
          types: tag.types || [],
        })) || [],
      locations:
        ffLocations?.locations?.map((location) => ({
          id: location.id,
          destinationWarehouse: location.destinationWarehouse || "",
          remainsIsActive: location.remainsIsActive || false,
          isActive: location.isActive || false,
        })) || [],
      collections:
        ffCollections?.collections?.map((collection) => ({
          id: collection.id,
          destinationWarehouse: collection.destinationWarehouse || "",
          remainsIsActive: collection.remainsIsActive || false,
          isActive: collection.isActive || false,
        })) || [],
    },
  });

  useEffect(() => {
    if (isDirty) {
      shopify.saveBar.show("save-bar");
    } else {
      shopify.saveBar.hide("save-bar");
    }
  }, [isDirty]);

  useEffect(() => {
    if (fetcherSaveSettings && fetcherSaveSettings.data?.success) {
      if (fetcherSaveSettings.data.message) {
        shopify.toast.show(
          t(`ff_status.toast.success.${fetcherSaveSettings.data.message}`),
        );
      }

      if (fetcherSaveSettings.data.message === "save_ff_settings_success") {
        mainReset(mainGetValues());
      }
    }
  }, [fetcherSaveSettings, mainReset, mainGetValues]);

  useEffect(() => {
    if (fetcherResetSettings && fetcherResetSettings.data?.success) {
      if (fetcherResetSettings.data.message) {
        shopify.toast.show(
          t(`ff_status.toast.success.${fetcherResetSettings.data.message}`),
        );
      }

      if (fetcherResetSettings.data.message === "reset_ff_settings_success") {
        mainReset({
          isEnabled: false,
          processPaymentgMethod: false,
          orderRiskAssissemnt: false,
          orderRiskLevels: ["HIGH"],
          fulfillBy: "locations",
          locations: [],
          collections: [],
        });
        navigate(".", { replace: true });
      }
    }
  }, [fetcherResetSettings, navigate, t, mainReset]);

  useEffect(() => {
    if (fetcherFilteredTag && fetcherFilteredTag.data?.success) {
      if (fetcherFilteredTag.data.message) {
        shopify.toast.show(
          t(`ff_status.toast.success.${fetcherFilteredTag.data.message}`),
        );
      }

      if (
        fetcherFilteredTag.data.message === "create_filtered_tag_success" ||
        fetcherFilteredTag.data.message === "delete_filtered_tag_success"
      ) {
        setFilteredTagValue("");
        setFilteredTagTypes(["order"]);
        navigate(".", { replace: true });
      }
    }
  }, [fetcherFilteredTag, navigate, t]);

  useEffect(() => {
    if (!isDirty) {
      const locationsData =
        ffLocations?.locations?.map((location) => ({
          id: location.id,
          destinationWarehouse: location.destinationWarehouse || "",
          remainsIsActive: location.remainsIsActive || false,
          isActive: location.isActive || false,
        })) || [];

      const collectionsData =
        ffCollections?.collections?.map((collection) => ({
          id: collection.id,
          destinationWarehouse: collection.destinationWarehouse || "",
          remainsIsActive: collection.remainsIsActive || false,
          isActive: collection.isActive || false,
        })) || [];

      const filteredTagsData =
        ffFilteredTags?.map((tag) => ({
          id: tag.id,
          value: tag.value,
          types: tag.types || [],
        })) || [];

      const currentLocations = mainWatch("locations") || [];
      const currentCollections = mainWatch("collections") || [];
      const currentFilteredTags = mainWatch("filteredTags") || [];

      const mergedLocations = [
        ...currentLocations.filter(
          (loc) => !locationsData.some((l) => l.id === loc.id),
        ),
        ...locationsData,
      ];

      const mergedCollections = [
        ...currentCollections.filter(
          (col) => !collectionsData.some((c) => c.id === col.id),
        ),
        ...collectionsData,
      ];

      const mergedFilteredTags = [
        ...currentFilteredTags.filter(
          (tag) => !filteredTagsData.some((t) => t.id === tag.id),
        ),
        ...filteredTagsData,
      ];

      mainReset({
        isEnabled: ffSettings?.isEnabled,
        processPaymentgMethod: ffSettings?.processPaymentgMethod,
        orderRiskAssissemnt: ffSettings?.orderRiskAssissemnt,
        orderRiskLevels: ffSettings?.orderRiskLevels,
        filteredByTagsIsActive: ffSettings?.filteredByTagsIsActive,
        fulfillBy: ffSettings?.fulfillBy,
        filteredTags: mergedFilteredTags,
        locations: mergedLocations,
        collections: mergedCollections,
      });
    }
  }, [
    ffLocations,
    ffCollections,
    ffFilteredTags,
    ffSettings,
    mainReset,
    isDirty,
    mainWatch,
  ]);

  useEffect(() => {
    if (actionData && actionData?.error) {
      shopify.toast.show(t(`ff_status.toast.error.${actionData.error}`), {
        isError: true,
      });
    }
  }, [actionData]);

  const handleSubmitLoginSettings = handleSubmit(
    (data) => {
      const body = {
        action: "login_ff",
        npLogin: data.npLogin || "",
        npPassword: data.npPassword || "",
        npOrganization: data.npOrganization || "",
        additionalOrganizationKey: data.additionalOrganizationKey || "",
      };

      fetcherLogin.submit(body, {
        method: "post",
      });
    },
    (errors) => {
      console.log("Validation errors:", errors);
    },
  );

  const handleSubmitSaveSettings = mainHandleSubmit((data) => {
    const body = {
      action: "save_ff_settings",
      isEnabled: String(data.isEnabled ?? false),
      processPaymentgMethod: String(data.processPaymentgMethod ?? false),
      orderRiskAssissemnt: String(data.orderRiskAssissemnt ?? false),
      orderRiskLevels: JSON.stringify(data.orderRiskLevels ?? []),
      filteredByTagsIsActive: String(data.filteredByTagsIsActive ?? false),
      filteredTags: JSON.stringify(data.filteredTags || []),
      fulfillBy: data.fulfillBy || null,
      locations: JSON.stringify(data.locations || []),
      collections: JSON.stringify(data.collections || []),
    };

    fetcherSaveSettings.submit(body, {
      method: "post",
    });
  });

  const handleSubmitLogout = () => {
    reset();
    shopify.toast.show(t("ff_status.toast.success.logout_ff_success"));
    fetcherLogin.submit({ action: "logout_ff" }, { method: "post" });
  };

  const handleSubmitCreatePaymentMethod = () => {
    if (!ffSettings?.id) return;

    const body = {
      name: paymentMethodName,
      ffSettingsId: ffSettings.id,
      action: "create_ff_payment_method",
    };

    fetcherPaymentMethod.submit(body, {
      method: "post",
    });

    setPaymentMethodName("");
  };

  const handleSubmitDeletePaymentMethod = (ffPaymentMethodId: string) => () => {
    const body = {
      ffPaymentMethodId: ffPaymentMethodId,
      action: "delete_ff_payment_method",
    };

    fetcherPaymentMethod.submit(body, {
      method: "post",
    });
  };

  const handleSubmitUpdatePaymentMethod = (
    ffPaymentMethodId: string,
    statuses: string[],
  ) => {
    const body = {
      ffPaymentMethodId: ffPaymentMethodId,
      statuses: JSON.stringify(statuses),
      action: "update_ff_payment_method",
    };

    fetcherPaymentMethod.submit(body, {
      method: "post",
    });
  };

  const handleChooseOrderRiskLevel = (level: string) => {
    const currentLevels = mainWatch("orderRiskLevels") || [];
    const hasLevel = currentLevels.includes(level);
    let newLevels;
    if (hasLevel) {
      newLevels = currentLevels.filter((l) => l !== level);
    } else {
      newLevels = [...currentLevels, level];
    }
    setMainValue("orderRiskLevels", newLevels, {
      shouldDirty: true,
    });
  };

  const handleSubmitResetSettings = () => {
    const body = {
      action: "reset_ff_settings",
    };
    fetcherResetSettings.submit(body, { method: "post" });
  };

  const handleSubmitDeleteFilteredTag = (filteredTagId: string) => () => {
    const body = {
      filteredTagId: filteredTagId,
      action: "delete_filtered_tag",
    };
    fetcherFilteredTag.submit(body, { method: "post" });
  };

  const handleSubmitCreateFilteredTag = (types: string[], value: string) => {
    const body = {
      types: JSON.stringify(types),
      value: value,
      action: "create_filtered_tag",
    };

    fetcherFilteredTag.submit(body, { method: "post" });
  };
  return (
    <s-page heading={t("global:navigating.autoff_settings")} inlineSize="base">
      <s-link slot="breadcrumb-actions" href="/app/settings">
        {t("global:navigating.settings")}
      </s-link>
      <ui-save-bar id="save-bar">
        <button
          variant="primary"
          id="save-button"
          onClick={handleSubmitSaveSettings}
        ></button>
        <button id="discart-button" onClick={() => mainReset()}></button>
      </ui-save-bar>
      <s-stack gap="base">
        <s-section heading={t("settings.heading.enable")}>
          <s-switch
            id="isEnabled"
            disabled={fetcherSaveSettings.state === "submitting"}
            label={t("settings.ff_enable")}
            checked={mainWatch("isEnabled")}
            onChange={(e) => {
              setMainValue("isEnabled", e.currentTarget.checked, {
                shouldDirty: true,
              });
            }}
          />
        </s-section>
        <s-section heading={t("settings.heading.order_risk_assissemnt")}>
          <s-stack gap="base">
            <s-switch
              id="orderRiskAssissemnt"
              label={t("settings.order_risk_assissemnt")}
              details={t("settings.order_risk_assissemnt_details")}
              checked={mainWatch("orderRiskAssissemnt")}
              onChange={(e) => {
                setMainValue("orderRiskAssissemnt", e.currentTarget.checked, {
                  shouldDirty: true,
                });
              }}
            />
            <s-stack gap="small-200">
              {["LOW", "MEDIUM", "HIGH"].map((level) => {
                const getTone = (
                  level: string,
                ): "success" | "warning" | "critical" | "neutral" => {
                  if (level === "LOW") return "success";
                  if (level === "MEDIUM") return "warning";
                  if (level === "HIGH") return "critical";
                  return "neutral";
                };

                return (
                  <s-stack
                    key={level}
                    direction="inline"
                    gap="small-200"
                    alignItems="center"
                  >
                    <s-checkbox
                      id="orderRiskLevels"
                      checked={mainWatch("orderRiskLevels")?.includes(level)}
                      onChange={() => {
                        handleChooseOrderRiskLevel(level);
                      }}
                    />
                    <div
                      className="cursor-pointer"
                      onClick={() => handleChooseOrderRiskLevel(level)}
                    >
                      <s-text tone={getTone(level)}>
                        {t(`settings.order_risk_levels.${level.toLowerCase()}`)}
                      </s-text>
                    </div>
                  </s-stack>
                );
              })}
            </s-stack>
          </s-stack>
        </s-section>
        <s-section heading={t("settings.heading.filtered_by_tags")}>
          <s-stack gap="base">
            <s-switch
              id="filteredByTagsIsActive"
              label={t("settings.filtered_by_tags.enable")}
              details={t("settings.filtered_by_tags.enable_details")}
              checked={mainWatch("filteredByTagsIsActive")}
              onChange={(e) => {
                setMainValue(
                  "filteredByTagsIsActive",
                  e.currentTarget.checked,
                  {
                    shouldDirty: true,
                  },
                );
              }}
            />
            <s-box
              borderRadius="base"
              borderStyle="solid"
              border="base"
              overflow="hidden"
            >
              <s-table>
                <s-grid
                  slot="filters"
                  gridTemplateColumns="1fr auto auto"
                  gap="small"
                  alignItems="center"
                >
                  <s-text-field
                    value={filteredTagValue}
                    onInput={(e) => setFilteredTagValue(e.currentTarget.value)}
                    placeholder={t(
                      "settings.filtered_by_tags.table.headers.value",
                    )}
                  />
                  <s-choice-list
                    multiple
                    onChange={(e) => {
                      setFilteredTagTypes(e.currentTarget.values);
                    }}
                  >
                    <s-choice
                      value="order"
                      selected={filteredTagTypes?.includes("order")}
                    >
                      {t("settings.filtered_by_tags.types.order")}
                    </s-choice>
                    <s-choice
                      value="customer"
                      selected={filteredTagTypes?.includes("customer")}
                    >
                      {t("settings.filtered_by_tags.types.customer")}
                    </s-choice>
                  </s-choice-list>
                  <s-button
                    icon="plus"
                    variant="secondary"
                    disabled={
                      filteredTagTypes.length === 0 ||
                      filteredTagValue.length === 0
                    }
                    loading={fetcherFilteredTag.state === "submitting"}
                    onClick={() =>
                      handleSubmitCreateFilteredTag(
                        filteredTagTypes,
                        filteredTagValue,
                      )
                    }
                  >
                    {t("global:buttons.add")}
                  </s-button>
                </s-grid>
                <s-table-header-row>
                  <s-table-header>
                    {t("settings.filtered_by_tags.table.headers.value")}
                  </s-table-header>
                  <s-table-header>
                    <p className="text-center">{t("settings.filtered_by_tags.table.headers.type")}</p>
                  </s-table-header>
                  <s-table-header format="numeric">
                    {t("settings.filtered_by_tags.table.headers.actions")}
                  </s-table-header>
                </s-table-header-row>
                <s-table-body>
                  {ffFilteredTags &&
                    ffFilteredTags.map((filteredTag) => (
                      <s-table-row key={filteredTag.id}>
                        <s-table-cell>{filteredTag.value}</s-table-cell>
                        <s-table-cell>
                          <s-stack
                            direction="inline"
                            gap="small-200"
                            justifyContent="center"
                          >
                          <s-choice-list
                            multiple
                            onChange={(e) => {
                              const currentTags =
                                mainWatch("filteredTags") || [];
                              const updatedTags = currentTags.map((tag) =>
                                tag.id === filteredTag.id
                                  ? {
                                      ...tag,
                                      types: e.currentTarget.values,
                                    }
                                  : tag,
                              );
                              setMainValue("filteredTags", updatedTags, {
                                shouldDirty: true,
                              });
                            }}
                          >
                            <s-choice
                              value="order"
                              selected={
                                mainWatch("filteredTags")
                                  ?.find((tag) => tag.id === filteredTag.id)
                                  ?.types.includes("order") || false
                              }
                            >
                              {t("settings.filtered_by_tags.types.order")}
                            </s-choice>
                            <s-choice
                              value="customer"
                              selected={
                                mainWatch("filteredTags")
                                  ?.find((tag) => tag.id === filteredTag.id)
                                  ?.types.includes("customer") || false
                              }
                            >
                                {t("settings.filtered_by_tags.types.customer")}
                              </s-choice>
                            </s-choice-list>
                          </s-stack>
                        </s-table-cell>
                        <s-table-cell>
                          <s-button
                            icon="delete"
                            variant="tertiary"
                            tone="critical"
                            onClick={handleSubmitDeleteFilteredTag(
                              filteredTag.id,
                            )}
                          >
                            {t("global:buttons.delete")}
                          </s-button>
                        </s-table-cell>
                      </s-table-row>
                    ))}
                </s-table-body>
              </s-table>
            </s-box>
          </s-stack>
        </s-section>
        <s-section heading={t("settings.heading.process_payment_method")}>
          <s-stack gap="base">
            <s-stack
              direction="inline"
              justifyContent="space-between"
              alignItems="center"
            >
              <s-switch
                id="processPaymentgMethod"
                disabled={fetcherSaveSettings.state === "submitting"}
                label={t("settings.process_payment_method")}
                details={t("settings.process_payment_method_tooltip")}
                checked={mainWatch("processPaymentgMethod")}
                onChange={(e) => {
                  setMainValue(
                    "processPaymentgMethod",
                    e.currentTarget.checked,
                    {
                      shouldDirty: true,
                    },
                  );
                }}
              />
            </s-stack>
            <s-box
              borderRadius="base"
              borderStyle="solid"
              border="base"
              overflow="hidden"
            >
              <s-table loading={fetcherPaymentMethod.state === "loading"}>
                <s-grid
                  slot="filters"
                  gridTemplateColumns="1fr auto"
                  gap="small-200"
                >
                  <s-text-field
                    label={t("settings.payment_method_label")}
                    labelAccessibilityVisibility="exclusive"
                    placeholder={t("settings.payment_method_placeholder")}
                    value={paymentMethodName}
                    onInput={(e) => setPaymentMethodName(e.currentTarget.value)}
                  />
                  <s-button
                    icon="plus"
                    variant="secondary"
                    disabled={paymentMethodName.length === 0}
                    loading={fetcherPaymentMethod.state === "submitting"}
                    onClick={handleSubmitCreatePaymentMethod}
                  >
                    {t("settings.add_payment_method")}
                  </s-button>
                </s-grid>
                <s-table-header-row>
                  <s-table-header>
                    {t("settings.table_payment_methods.headers.name")}
                  </s-table-header>
                  <s-table-header>
                    <p className="text-center">
                      {t("settings.table_payment_methods.headers.statuses")}
                    </p>
                  </s-table-header>
                  <s-table-header format="numeric">
                    {t("settings.table_payment_methods.headers.actions")}
                  </s-table-header>
                </s-table-header-row>
                <s-table-body>
                  {ffPaymentMethods &&
                    ffPaymentMethods.map((paymentMethod) => (
                      <s-table-row key={paymentMethod.id}>
                        <s-table-cell>{paymentMethod.name}</s-table-cell>
                        <s-table-cell>
                          <s-stack
                            direction="inline"
                            gap="small-200"
                            justifyContent="center"
                          >
                            {["partialy_paid", "payment_pending", "paid"].map(
                              (status) => (
                                <div>
                                  <s-clickable
                                    onClick={() =>
                                      handleSubmitUpdatePaymentMethod(
                                        paymentMethod.id,
                                        paymentMethod.statuses.includes(status)
                                          ? paymentMethod.statuses.filter(
                                              (s) => s !== status,
                                            )
                                          : [...paymentMethod.statuses, status],
                                      )
                                    }
                                  >
                                    <s-badge
                                      key={status}
                                      tone={
                                        paymentMethod.statuses.includes(status)
                                          ? "success"
                                          : "neutral"
                                      }
                                    >
                                      {t(
                                        `settings.table_payment_methods.statuses.${status}`,
                                      )}
                                    </s-badge>
                                  </s-clickable>
                                </div>
                              ),
                            )}
                          </s-stack>
                        </s-table-cell>
                        <s-table-cell>
                          <s-button
                            icon="delete"
                            variant="tertiary"
                            tone="critical"
                            loading={
                              fetcherPaymentMethod.state === "submitting"
                            }
                            onClick={handleSubmitDeletePaymentMethod(
                              paymentMethod.id,
                            )}
                          >
                            {t("global:buttons.delete")}
                          </s-button>
                        </s-table-cell>
                      </s-table-row>
                    ))}
                </s-table-body>
              </s-table>
            </s-box>
          </s-stack>
        </s-section>
        <s-section heading={t("settings.heading.fulfillment_settings")}>
          <s-stack gap="base">
            <s-choice-list
              label={t("settings.fulfill_by.label")}
              onChange={(e) => {
                setMainValue("fulfillBy", e.currentTarget.values[0], {
                  shouldDirty: true,
                });
              }}
            >
              <s-choice
                value="locations"
                selected={mainWatch("fulfillBy") === "locations"}
              >
                <s-text>{t("settings.fulfill_by.locations")}</s-text>
              </s-choice>
              <s-choice
                value="collections"
                selected={mainWatch("fulfillBy") === "collections"}
              >
                <s-text>{t("settings.fulfill_by.collections")}</s-text>
              </s-choice>
            </s-choice-list>
            <s-box
              borderRadius="base"
              borderStyle="solid"
              border="base"
              overflow="hidden"
            >
              {mainWatch("fulfillBy") === "locations" ? (
                <s-section padding="none">
                  <s-table
                    paginate
                    hasPreviousPage={ffLocations?.hasPreviousPage || false}
                    hasNextPage={ffLocations?.hasNextPage || false}
                    onPreviousPage={() => {
                      const currentPage = parseInt(
                        searchParams.get("locationsPage") || "1",
                        10,
                      );
                      if (currentPage > 1) {
                        const newSearchParams = new URLSearchParams(
                          searchParams,
                        );
                        newSearchParams.set(
                          "locationsPage",
                          String(currentPage - 1),
                        );
                        navigate(`?${newSearchParams.toString()}`, {
                          preventScrollReset: true,
                        });
                      }
                    }}
                    onNextPage={() => {
                      const currentPage = parseInt(
                        searchParams.get("locationsPage") || "1",
                        10,
                      );
                      const newSearchParams = new URLSearchParams(searchParams);
                      newSearchParams.set(
                        "locationsPage",
                        String(currentPage + 1),
                      );
                      navigate(`?${newSearchParams.toString()}`, {
                        preventScrollReset: true,
                      });
                    }}
                  >
                    <s-grid
                      slot="filters"
                      gridTemplateColumns="1fr auto"
                      gap="small-200"
                    >
                      <s-text-field
                        value={searchParams.get("locationsSearch") || ""}
                        onInput={(e) => {
                          const searchValue = e.currentTarget.value;
                          const newSearchParams = new URLSearchParams(
                            searchParams,
                          );

                          if (searchValue.trim()) {
                            newSearchParams.set("locationsSearch", searchValue);
                          } else {
                            newSearchParams.delete("locationsSearch");
                          }

                          newSearchParams.set("locationsPage", "1");

                          navigate(`?${newSearchParams.toString()}`, {
                            preventScrollReset: true,
                          });
                        }}
                      />
                      <s-button
                        icon="sort"
                        variant="secondary"
                        interestFor="sort-tooltip"
                        commandFor="sort-actions"
                        accessibilityLabel="Sort"
                      />
                      <s-tooltip id="sort-tooltip">
                        <s-text>{t("settings.sort")}</s-text>
                      </s-tooltip>
                      <s-popover id="sort-actions">
                        <s-box padding="small">
                          <s-choice-list
                            label={t("settings.order_by.label")}
                            onChange={(e) => {
                              const newOrderBy = e.currentTarget.values[0];
                              const newSearchParams = new URLSearchParams(
                                searchParams,
                              );
                              newSearchParams.set(
                                "locationsOrderBy",
                                newOrderBy,
                              );
                              newSearchParams.set("locationsPage", "1");
                              navigate(`?${newSearchParams.toString()}`, {
                                preventScrollReset: true,
                              });
                            }}
                          >
                            <s-choice
                              value="name"
                              selected={locationsOrderBy === "name"}
                            >
                              {t("settings.order_by.name")}
                            </s-choice>
                            <s-choice
                              value="warehouse"
                              selected={locationsOrderBy === "warehouse"}
                            >
                              {t("settings.order_by.destination_warehouse")}
                            </s-choice>
                          </s-choice-list>
                        </s-box>
                      </s-popover>
                    </s-grid>
                    <s-table-header-row>
                      <s-table-header>
                        {t("settings.table_locations.headers.location")}
                      </s-table-header>
                      <s-table-header>
                        <p className="text-center">
                          {t(
                            "settings.table_locations.headers.destination_warehouse",
                          )}
                        </p>
                      </s-table-header>
                      <s-table-header>
                        <p className="text-center">
                          {t("settings.table_locations.headers.remains_active")}
                        </p>
                      </s-table-header>
                      <s-table-header>
                        <p className="text-center">
                          {t("settings.table_locations.headers.is_active")}
                        </p>
                      </s-table-header>
                    </s-table-header-row>
                    <s-table-body>
                      {ffLocations?.locations &&
                        ffLocations.locations.map((location) => (
                          <s-table-row key={location.id}>
                            <s-table-cell>
                              <s-heading>{location.name}</s-heading>
                              <s-paragraph color="subdued">
                                {location.address}
                              </s-paragraph>
                            </s-table-cell>
                            <s-table-cell>
                              <s-text-field
                                value={
                                  mainWatch("locations")?.find(
                                    (l) => l.id === location.id,
                                  )?.destinationWarehouse || ""
                                }
                                onInput={(e) => {
                                  const currentLocations =
                                    mainWatch("locations") || [];
                                  const updatedLocations = currentLocations.map(
                                    (l) =>
                                      l.id === location.id
                                        ? {
                                            ...l,
                                            destinationWarehouse:
                                              e.currentTarget.value,
                                          }
                                        : l,
                                  );
                                  setMainValue("locations", updatedLocations, {
                                    shouldDirty: true,
                                  });
                                }}
                              />
                            </s-table-cell>
                            <s-table-cell>
                              <s-stack
                                direction="inline"
                                justifyContent="center"
                              >
                                <s-switch
                                  checked={
                                    mainWatch("locations")?.find(
                                      (l) => l.id === location.id,
                                    )?.remainsIsActive || false
                                  }
                                  onChange={(e) => {
                                    const currentLocations =
                                      mainWatch("locations") || [];
                                    const updatedLocations =
                                      currentLocations.map((l) =>
                                        l.id === location.id
                                          ? {
                                              ...l,
                                              remainsIsActive:
                                                e.currentTarget.checked,
                                            }
                                          : l,
                                      );
                                    setMainValue(
                                      "locations",
                                      updatedLocations,
                                      {
                                        shouldDirty: true,
                                      },
                                    );
                                  }}
                                />
                              </s-stack>
                            </s-table-cell>
                            <s-table-cell>
                              <s-stack
                                direction="inline"
                                justifyContent="center"
                              >
                                <s-switch
                                  checked={
                                    mainWatch("locations")?.find(
                                      (l) => l.id === location.id,
                                    )?.isActive || false
                                  }
                                  onChange={(e) => {
                                    const currentLocations =
                                      mainWatch("locations") || [];
                                    const updatedLocations =
                                      currentLocations.map((l) =>
                                        l.id === location.id
                                          ? {
                                              ...l,
                                              isActive: e.currentTarget.checked,
                                            }
                                          : l,
                                      );
                                    setMainValue(
                                      "locations",
                                      updatedLocations,
                                      {
                                        shouldDirty: true,
                                      },
                                    );
                                  }}
                                />
                              </s-stack>
                            </s-table-cell>
                          </s-table-row>
                        ))}
                    </s-table-body>
                  </s-table>
                </s-section>
              ) : (
                <s-section padding="none">
                  <s-table
                    paginate
                    hasPreviousPage={ffCollections?.hasPreviousPage || false}
                    hasNextPage={ffCollections?.hasNextPage || false}
                    onPreviousPage={() => {
                      const currentPage = parseInt(
                        searchParams.get("collectionsPage") || "1",
                        10,
                      );
                      if (currentPage > 1) {
                        const newSearchParams = new URLSearchParams(
                          searchParams,
                        );
                        newSearchParams.set(
                          "collectionsPage",
                          String(currentPage - 1),
                        );
                        navigate(`?${newSearchParams.toString()}`, {
                          preventScrollReset: true,
                        });
                      }
                    }}
                    onNextPage={() => {
                      const currentPage = parseInt(
                        searchParams.get("collectionsPage") || "1",
                        10,
                      );
                      const newSearchParams = new URLSearchParams(searchParams);
                      newSearchParams.set(
                        "collectionsPage",
                        String(currentPage + 1),
                      );
                      navigate(`?${newSearchParams.toString()}`, {
                        preventScrollReset: true,
                      });
                    }}
                  >
                    <s-grid
                      slot="filters"
                      gridTemplateColumns="1fr auto"
                      gap="small-200"
                    >
                      <s-text-field
                        value={searchParams.get("collectionsSearch") || ""}
                        onInput={(e) => {
                          const searchValue = e.currentTarget.value;
                          const newSearchParams = new URLSearchParams(
                            searchParams,
                          );

                          if (searchValue.trim()) {
                            newSearchParams.set(
                              "collectionsSearch",
                              searchValue,
                            );
                          } else {
                            newSearchParams.delete("collectionsSearch");
                          }

                          newSearchParams.set("collectionsPage", "1");

                          navigate(`?${newSearchParams.toString()}`, {
                            preventScrollReset: true,
                          });
                        }}
                      />
                      <s-button
                        icon="sort"
                        variant="secondary"
                        interestFor="collections-sort-tooltip"
                        commandFor="collections-sort-actions"
                        accessibilityLabel="Sort"
                      />
                      <s-tooltip id="collections-sort-tooltip">
                        <s-text>{t("settings.sort")}</s-text>
                      </s-tooltip>
                      <s-popover id="collections-sort-actions">
                        <s-box padding="small">
                          <s-choice-list
                            label={t("settings.order_by.label")}
                            onChange={(e) => {
                              const newOrderBy = e.currentTarget.values[0];
                              const newSearchParams = new URLSearchParams(
                                searchParams,
                              );
                              newSearchParams.set(
                                "collectionsOrderBy",
                                newOrderBy,
                              );
                              newSearchParams.set("collectionsPage", "1");
                              navigate(`?${newSearchParams.toString()}`, {
                                preventScrollReset: true,
                              });
                            }}
                          >
                            <s-choice
                              value="name"
                              selected={collectionsOrderBy === "name"}
                            >
                              {t("settings.order_by.name")}
                            </s-choice>
                            <s-choice
                              value="warehouse"
                              selected={collectionsOrderBy === "warehouse"}
                            >
                              {t("settings.order_by.destination_warehouse")}
                            </s-choice>
                          </s-choice-list>
                        </s-box>
                      </s-popover>
                    </s-grid>
                    <s-table-header-row>
                      <s-table-header>
                        {t("settings.table_collections.headers.collection")}
                      </s-table-header>
                      <s-table-header>
                        <p className="text-center">
                          {t(
                            "settings.table_collections.headers.destination_warehouse",
                          )}
                        </p>
                      </s-table-header>
                      <s-table-header>
                        <p className="text-center">
                          {t(
                            "settings.table_collections.headers.remains_active",
                          )}
                        </p>
                      </s-table-header>
                      <s-table-header>
                        <p className="text-center">
                          {t("settings.table_collections.headers.is_active")}
                        </p>
                      </s-table-header>
                    </s-table-header-row>
                    <s-table-body>
                      {ffCollections?.collections &&
                        ffCollections.collections.map((collection) => (
                          <s-table-row key={collection.id}>
                            <s-table-cell>
                              <s-heading>{collection.name}</s-heading>
                              {collection.description && (
                                <s-paragraph color="subdued">
                                  {collection.description}
                                </s-paragraph>
                              )}
                            </s-table-cell>
                            <s-table-cell>
                              <s-text-field
                                value={
                                  mainWatch("collections")?.find(
                                    (c) => c.id === collection.id,
                                  )?.destinationWarehouse || ""
                                }
                                onInput={(e) => {
                                  const currentCollections =
                                    mainWatch("collections") || [];
                                  const updatedCollections =
                                    currentCollections.map((c) =>
                                      c.id === collection.id
                                        ? {
                                            ...c,
                                            destinationWarehouse:
                                              e.currentTarget.value,
                                          }
                                        : c,
                                    );
                                  setMainValue(
                                    "collections",
                                    updatedCollections,
                                    {
                                      shouldDirty: true,
                                    },
                                  );
                                }}
                              />
                            </s-table-cell>
                            <s-table-cell>
                              <s-stack
                                direction="inline"
                                justifyContent="center"
                              >
                                <s-switch
                                  checked={
                                    mainWatch("collections")?.find(
                                      (c) => c.id === collection.id,
                                    )?.remainsIsActive || false
                                  }
                                  onChange={(e) => {
                                    const currentCollections =
                                      mainWatch("collections") || [];
                                    const updatedCollections =
                                      currentCollections.map((c) =>
                                        c.id === collection.id
                                          ? {
                                              ...c,
                                              remainsIsActive:
                                                e.currentTarget.checked,
                                            }
                                          : c,
                                      );
                                    setMainValue(
                                      "collections",
                                      updatedCollections,
                                      {
                                        shouldDirty: true,
                                      },
                                    );
                                  }}
                                />
                              </s-stack>
                            </s-table-cell>
                            <s-table-cell>
                              <s-stack
                                direction="inline"
                                justifyContent="center"
                              >
                                <s-switch
                                  checked={
                                    mainWatch("collections")?.find(
                                      (c) => c.id === collection.id,
                                    )?.isActive || false
                                  }
                                  onChange={(e) => {
                                    const currentCollections =
                                      mainWatch("collections") || [];
                                    const updatedCollections =
                                      currentCollections.map((c) =>
                                        c.id === collection.id
                                          ? {
                                              ...c,
                                              isActive: e.currentTarget.checked,
                                            }
                                          : c,
                                      );
                                    setMainValue(
                                      "collections",
                                      updatedCollections,
                                      {
                                        shouldDirty: true,
                                      },
                                    );
                                  }}
                                />
                              </s-stack>
                            </s-table-cell>
                          </s-table-row>
                        ))}
                    </s-table-body>
                  </s-table>
                </s-section>
              )}
            </s-box>
          </s-stack>
        </s-section>
        <s-section heading={t("settings.heading.tools")}>
          <s-box
            borderRadius="base"
            borderStyle="solid"
            border="base"
            overflow="hidden"
          >
            <s-stack>
              <s-clickable>
                <s-box padding="base">
                  <s-stack
                    direction="inline"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <s-box>
                      <s-heading>{t("settings.tools.logs_heading")}</s-heading>
                      <s-paragraph color="subdued">
                        {t("settings.tools.logs_description")}
                      </s-paragraph>
                    </s-box>
                    <s-icon type="chevron-right" />
                  </s-stack>
                </s-box>
              </s-clickable>
              <s-divider />
              <s-box padding="base">
                <s-stack direction="inline" justifyContent="space-between">
                  <s-box>
                    <s-heading>{t("settings.tools.reset_heading")}</s-heading>
                    <s-paragraph color="subdued">
                      {t("settings.tools.reset_description")}
                    </s-paragraph>
                  </s-box>
                  <s-button
                    variant="secondary"
                    tone="critical"
                    icon="reset"
                    commandFor="reset-ff-settings-modal"
                  >
                    {t("global:buttons.reset")}
                  </s-button>
                </s-stack>
              </s-box>
            </s-stack>
          </s-box>
        </s-section>
      </s-stack>
      <s-section slot="aside" heading={t("ff_status.heading")}>
        <s-unordered-list>
          <s-list-item>
            <s-stack
              direction="inline"
              gap="small-300"
              justifyContent="space-between"
            >
              <s-text>{t("ff_status.authoriz_status")}:</s-text>
              {ffSettings?.npLogin && ffSettings?.npPassword ? (
                <s-badge tone="success" icon="check-circle">
                  {t("ff_status.authorized")}
                </s-badge>
              ) : (
                <s-badge tone="critical" icon="x-circle">
                  {t("ff_status.unauthorized")}
                </s-badge>
              )}
            </s-stack>
          </s-list-item>
          <s-list-item>
            <s-stack
              direction="inline"
              gap="small-300"
              justifyContent="space-between"
            >
              <s-text>{t("ff_status.autoff_status")}:</s-text>
              <s-badge
                icon={ffSettings?.isEnabled ? "check-circle" : "x-circle"}
                tone={ffSettings?.isEnabled ? "success" : "critical"}
              >
                {ffSettings?.isEnabled
                  ? t("ff_status.enabled")
                  : t("ff_status.disabled")}
              </s-badge>
            </s-stack>
          </s-list-item>
          <s-list-item>
            <s-stack
              direction="inline"
              gap="small-300"
              justifyContent="space-between"
            >
              <s-text>{t("ff_status.curent_organization")}:</s-text>
              {ffSettings?.npOrganization && (
                <s-chip>{ffSettings.npOrganization}</s-chip>
              )}
            </s-stack>
          </s-list-item>
        </s-unordered-list>
      </s-section>
      <s-section slot="aside" heading={t("auth.form_title")}>
        <Form onSubmit={handleSubmitLoginSettings}>
          {showOrganizationTooltip && (
            <s-banner
              onDismiss={() => setShowOrganizationTooltip(false)}
              tone="info"
              dismissible
            >
              <s-paragraph>{t("auth.np_organization_tooltip")}</s-paragraph>
            </s-banner>
          )}
          <s-stack gap="base">
            <s-password-field
              required
              label={t("auth.np_login_label")}
              {...register("npLogin", {
                required: t("auth.np_login_required"),
              })}
              error={errors.npLogin?.message}
            />
            <s-password-field
              required
              label={t("auth.np_password_label")}
              {...register("npPassword", {
                required: t("auth.np_password_required"),
              })}
              error={errors.npPassword?.message}
            />
            <s-text-field
              required
              label={t("auth.np_organization_label")}
              {...register("npOrganization", {
                required: t("auth.np_organization_required"),
              })}
              error={errors.npOrganization?.message}
            />
            <s-password-field
              label={t("auth.additional_organization_key_label")}
              {...register("additionalOrganizationKey")}
              error={errors.additionalOrganizationKey?.message}
            />
            <s-divider />
            <s-stack direction="inline" justifyContent="space-between">
              <s-button
                disabled={
                  navigation.state === "submitting" ||
                  !(ffSettings?.npLogin && ffSettings?.npPassword)
                }
                tone="critical"
                icon="exit"
                loading={fetcherLogin.state === "submitting"}
                onClick={handleSubmitLogout}
              >
                {t("auth.logout")}
              </s-button>
              <s-button
                type="submit"
                variant="primary"
                loading={fetcherLogin.state === "submitting"}
              >
                {t("auth.submit_button")}
              </s-button>
            </s-stack>
          </s-stack>
        </Form>
      </s-section>
      <s-modal
        id="reset-ff-settings-modal"
        heading={t("settings.tools.reset_heading")}
      >
        <s-paragraph>{t("settings.tools.reset_description")}</s-paragraph>
        <s-button
          slot="secondary-actions"
          commandFor="reset-ff-settings-modal"
          command="--hide"
        >
          {t("global:buttons.close")}
        </s-button>
        <s-button
          slot="primary-action"
          commandFor="reset-ff-settings-modal"
          variant="primary"
          tone="critical"
          command="--hide"
          onClick={handleSubmitResetSettings}
          loading={fetcherResetSettings.state === "submitting"}
        >
          {t("global:buttons.reset")}
        </s-button>
      </s-modal>
    </s-page>
  );
}
