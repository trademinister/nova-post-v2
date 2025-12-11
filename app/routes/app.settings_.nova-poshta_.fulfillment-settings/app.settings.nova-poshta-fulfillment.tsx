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
  useSubmit,
} from "react-router";
import { action, loader } from "./route";

export default function NovaPoshtaFfSettings() {
  const { t } = useTranslation(["autoff_settings", "global"]);
  const { ffSettings, ffPaymentMethods, ffLocations, ffCollections } =
    useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  const navigate = useNavigate();
  const navigation = useNavigation();

  const [paymentMethodName, setPaymentMethodName] = useState("");
  const [searchParams] = useSearchParams();
  const locationsOrderBy = searchParams.get("locationsOrderBy") || "name";
  const collectionsOrderBy = searchParams.get("collectionsOrderBy") || "name";

  const fetcherLogin = useFetcher<typeof action>();
  const fetcherSaveSettings = useFetcher<typeof action>();
  const fetcherPaymentMethod = useFetcher<typeof action>();

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
      fulfillBy: ffSettings?.fulfillBy,
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
      isEnabled: data.isEnabled ?? false,
      processPaymentgMethod: data.processPaymentgMethod ?? false,
      orderRiskAssissemnt: data.orderRiskAssissemnt ?? false,
      orderRiskLevels: data.orderRiskLevels ?? [],
      fulfillBy: data.fulfillBy || null,
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
                                value={location.destinationWarehouse || ""}
                              />
                            </s-table-cell>
                            <s-table-cell>
                              <s-stack
                                direction="inline"
                                justifyContent="center"
                              >
                                <s-switch checked={location.remainsIsActive} />
                              </s-stack>
                            </s-table-cell>
                            <s-table-cell>
                              <s-stack
                                direction="inline"
                                justifyContent="center"
                              >
                                <s-switch checked={location.isActive} />
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
                                value={collection.destinationWarehouse || ""}
                              />
                            </s-table-cell>
                            <s-table-cell>
                              <s-stack
                                direction="inline"
                                justifyContent="center"
                              >
                                <s-switch
                                  checked={collection.remainsIsActive}
                                />
                              </s-stack>
                            </s-table-cell>
                            <s-table-cell>
                              <s-stack
                                direction="inline"
                                justifyContent="center"
                              >
                                <s-switch checked={collection.isActive} />
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
            padding="base"
          >
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
                onClick={() => {}}
              >
                {t("global:buttons.reset")}
              </s-button>
            </s-stack>
          </s-box>
        </s-section>
      </s-stack>
      <s-section slot="aside" heading={t("ff_status.heading")}>
        <s-unordered-list>
          <s-list-item>
            <s-stack direction="inline" gap="small-300">
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
            <s-stack direction="inline" gap="small-300">
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
            <s-stack direction="inline" gap="small-300">
              <s-text>{t("ff_status.curent_organization")}:</s-text>
              {ffSettings?.npOrganization && (
                <s-chip>{ffSettings?.npOrganization}</s-chip>
              )}
            </s-stack>
          </s-list-item>
        </s-unordered-list>
      </s-section>
      <s-section slot="aside" heading={t("auth.form_title")}>
        <Form onSubmit={handleSubmitLoginSettings}>
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
              details={t("auth.np_organization_tooltip")}
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
    </s-page>
  );
}
