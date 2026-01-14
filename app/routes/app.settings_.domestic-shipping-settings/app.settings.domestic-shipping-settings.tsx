import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import { useForm } from "react-hook-form";
import { SaveBar } from "@shopify/app-bridge-react";
import {
  DeliveryPaymentType,
  FormValues,
  PackingType,
  ShipmentType,
  ShipperType,
  ShippingType,
  CountryCode,
} from "app/routes/app.settings_.domestic-shipping-settings/types";
import PhoneTextField from "./components/phone-text-field";
import CreateBoxModal from "./components/modals/create-box-modal";
import UniformPackageModal from "./components/modals/uniform-package-modal";
import ExtendedPackagingModal from "./components/modals/extended-packaging-modal";
import Autocomplete from "./components/autocomplete";
import { useTranslation } from "react-i18next";

type Props = {};

export default function DomesticShippingSettingsPage({}: Props) {
  const { t } = useTranslation(["shipping_settings", "global"]);

  const {
    watch,
    setValue,
    reset,
    getValues,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<FormValues>({
    defaultValues: {
      shipmentType: "Cargo",
      packingType: "extended",
      uniformPackage: {
        id: "8f49720a-cd66-442f-9b85-9dcce7e34f8b",
        description: "Коробка 4 кг пласка",
        length: "53.5",
        width: "38",
        height: "7.5",
        volumetricWeight: "4",
        external: false,
      },
      deliveryPaymentType: "Cash",
      deliveryPayerType: "Sender",
      additionalService: "",
      declaredPriceAmount: "0",
      comissionPayer: "Recipient",
      shipperType: "Legal entity",
      shippingType: "Warehouse",
      sender: null,
      settlement: { label: "Київ", value: "49gerjgl32" },
      warehouse: {
        label: "Відділення №1 вул. Пирогівський шлях, 135",
        value: "68549ferkojge",
      },
      street: null,
    },
  });

  const shipmentType = watch("shipmentType");
  const packingType = watch("packingType");
  const uniformPackage = watch("uniformPackage");
  const deliveryPaymentType = watch("deliveryPaymentType");
  const shipperType = watch("shipperType");
  const shippingType = watch("shippingType");
  const additionalService = watch("additionalService");
  const commisionPayer = watch("comissionPayer");
  const declaredPriceAmount = watch("declaredPriceAmount");
  const sender = watch("sender");
  const settlement = watch("settlement");
  const warehouse = watch("warehouse");
  const street = watch("street");

  useEffect(() => {
    if (isDirty) {
      shopify.saveBar.show("shipping-settings-save-bar");
    } else {
      shopify.saveBar.hide("shipping-settings-save-bar");
    }
  }, [isDirty]);

  return (
    <s-page heading={t("domestic.shipping.title")}>
      <s-link slot="breadcrumb-actions" href="/app/settings">
        {t("global:navigating.settings")}
      </s-link>
      <s-box paddingBlock="base">
        <s-stack direction="block" gap="base">
          <s-grid gridTemplateColumns="3fr 1fr" gap="base">
            <s-grid-item>
              <s-section
                heading={t("domestic.shipping.section.personal_info.title")}
              >
                <s-grid gridTemplateColumns="1fr 1fr" gap="base">
                  <s-grid-item>
                    <Autocomplete
                      id="sender"
                      label={t(
                        "domestic.shipping.section.personal_info.sender",
                      )}
                      modalHeading="Відправник"
                      placeholder="Обрати відправника"
                      searchPlaceholder="Шукати відправника"
                      selected={sender}
                      onSelected={(value) => setValue("sender", value)}
                      options={[
                        { label: "ФОП В'ячеслав", value: "3213hjuifhi5higeir" },
                        { label: "ФОП Станіслав", value: "654dfoert345dfsas" },
                      ]}
                      defaultOptions={[
                        { label: "ФОП В'ячеслав", value: "3213hjuifhi5higeir" },
                        { label: "ФОП Станіслав", value: "654dfoert345dfsas" },
                      ]}
                      required
                    />
                  </s-grid-item>
                  <s-grid-item>
                    <PhoneTextField
                      label={t(
                        "domestic.shipping.section.personal_info.phone_number",
                      )}
                      countryCode="UA"
                    />
                  </s-grid-item>
                </s-grid>
              </s-section>
            </s-grid-item>
          </s-grid>
          <s-divider color="strong" />
          <s-grid gridTemplateColumns="3fr 1fr" gap="base">
            <s-grid-item gridRow="span 1">
              <s-section
                heading={t("domestic.shipping.section.packaging.title")}
              >
                <s-stack direction="block" gap="base">
                  <s-grid gridTemplateColumns="repeat(14, 1fr)" gap="small-200">
                    <s-grid-item gridColumn="span 12" gridRow="span 1">
                      <s-switch
                        label={t(
                          "domestic.shipping.section.packaging.extended_packaging",
                        )}
                        checked={packingType === "extended"}
                        value={packingType}
                        onChange={(e) => {
                          if (packingType === "default") {
                            setValue("packingType", "extended", {
                              shouldDirty: true,
                            });
                          } else {
                            setValue("packingType", "default", {
                              shouldDirty: true,
                            });
                          }
                        }}
                      />
                    </s-grid-item>
                    <s-grid-item gridColumn="span 8">
                      <s-grid
                        gridTemplateColumns="repeat(14, 1fr)"
                        gap="small-300"
                      >
                        <>
                          <s-grid-item gridColumn="span 9">
                            <s-stack direction="block" gap="base">
                              <s-clickable
                                border="base"
                                padding="small-300"
                                background="base"
                                borderColor="strong"
                                borderRadius="small"
                                commandFor={
                                  packingType === "default"
                                    ? "uniform-package-modal"
                                    : "extended-packaging-modal"
                                }
                              >
                                <s-stack
                                  direction="inline"
                                  justifyContent="space-between"
                                >
                                  <s-text>
                                    {packingType === "default"
                                      ? uniformPackage?.description ||
                                        t(
                                          "domestic.shipping.section.packaging.select_uniform_packaging",
                                        )
                                      : t(
                                          "domestic.shipping.section.packaging.configure_packaging",
                                        )}
                                  </s-text>
                                  <s-icon type="chevron-down" />
                                </s-stack>
                              </s-clickable>
                            </s-stack>
                          </s-grid-item>
                          <s-stack direction="inline" alignContent="safe end">
                            <s-grid-item gridColumn="span 2">
                              <s-box paddingBlockEnd="small-400">
                                <s-button
                                  icon="plus"
                                  commandFor="create-box-modal"
                                />
                              </s-box>
                            </s-grid-item>
                          </s-stack>
                        </>
                      </s-grid>
                    </s-grid-item>
                  </s-grid>
                  <s-box inlineSize="280px">
                    <s-text-area
                      label={t(
                        "domestic.shipping.section.packaging.default_shipping_description",
                      )}
                      autocomplete="off"
                    />
                  </s-box>
                  <s-switch
                    label={t(
                      "domestic.shipping.section.packaging.add_sku_to_shipping.title",
                    )}
                    details={t(
                      "domestic.shipping.section.packaging.add_sku_to_shipping.description",
                    )}
                  />
                </s-stack>
              </s-section>
            </s-grid-item>
            <s-grid-item gridRow="span 2">
              <s-section
                heading={t("domestic.shipping.section.shipment.title")}
              >
                <s-stack direction="inline" gap="base">
                  <s-choice-list
                    label={t("domestic.shipping.section.shipment.type.title")}
                    name="shipment-type-choice-list"
                    onChange={(e) => {
                      const value = e.currentTarget.values[0] as ShipmentType;
                      setValue("shipmentType", value, {
                        shouldDirty: true,
                      });
                    }}
                  >
                    <s-choice
                      value="Parcel"
                      defaultSelected={shipmentType === "Parcel"}
                    >
                      {t("domestic.shipping.section.shipment.type.parcel")}
                    </s-choice>
                    <s-choice
                      value="Cargo"
                      defaultSelected={shipmentType === "Cargo"}
                    >
                      {t("domestic.shipping.section.shipment.type.cargo")}
                    </s-choice>
                    <s-choice
                      value="Documents"
                      defaultSelected={shipmentType === "Documents"}
                    >
                      {t("domestic.shipping.section.shipment.type.documents")}
                    </s-choice>
                    <s-choice
                      value="TiresWheels"
                      defaultSelected={shipmentType === "TiresWheels"}
                    >
                      {t(
                        "domestic.shipping.section.shipment.type.wheels_tires",
                      )}
                    </s-choice>
                    <s-choice
                      value="Pallet"
                      defaultSelected={shipmentType === "Pallet"}
                    >
                      {t("domestic.shipping.section.shipment.type.palets")}
                    </s-choice>
                  </s-choice-list>
                  <s-stack direction="block" gap="base">
                    <s-choice-list
                      label={t(
                        "domestic.shipping.section.shipment.delivery_payment_type.title",
                      )}
                      name="delivery-payment-type-choice-list"
                      onChange={(e) => {
                        const value = e.currentTarget
                          .values[0] as DeliveryPaymentType;
                        setValue("deliveryPaymentType", value, {
                          shouldDirty: true,
                        });
                      }}
                    >
                      <s-choice
                        value="Cash"
                        defaultSelected={deliveryPaymentType === "Cash"}
                      >
                        {t(
                          "domestic.shipping.section.shipment.delivery_payment_type.cash",
                        )}
                      </s-choice>
                      <s-choice
                        value="Cashless"
                        defaultSelected={deliveryPaymentType === "Cashless"}
                      >
                        {t(
                          "domestic.shipping.section.shipment.delivery_payment_type.cashless",
                        )}
                      </s-choice>
                    </s-choice-list>
                    <s-choice-list
                      label={t(
                        "domestic.shipping.section.shipment.delivery_payer.title",
                      )}
                      name="delivery-payment-type-choice-list"
                      onChange={(e) => {
                        const value = e.currentTarget
                          .values[0] as DeliveryPaymentType;
                        setValue("deliveryPaymentType", value, {
                          shouldDirty: true,
                        });
                      }}
                    >
                      <s-choice
                        value="Sender"
                        defaultSelected={deliveryPaymentType === "Cash"}
                      >
                        {t(
                          "domestic.shipping.section.shipment.delivery_payer.sender",
                        )}
                      </s-choice>
                      <s-choice
                        value="Recipient"
                        defaultSelected={deliveryPaymentType === "Cashless"}
                      >
                        {t(
                          "domestic.shipping.section.shipment.delivery_payer.recipient",
                        )}
                      </s-choice>
                      <s-choice
                        value="ThirdPerson"
                        defaultSelected={deliveryPaymentType === "Cashless"}
                      >
                        {t(
                          "domestic.shipping.section.shipment.delivery_payer.third_person",
                        )}
                      </s-choice>
                    </s-choice-list>
                  </s-stack>
                </s-stack>
              </s-section>
            </s-grid-item>
            <s-grid-item gridRow="span 1">
              <s-section
                heading={t(
                  "domestic.shipping.section.optional_additional_services.title",
                )}
                padding="base"
              >
                <s-stack direction="block" gap="small-300">
                  <s-stack direction="inline" gap="base">
                    <s-checkbox
                      label={t(
                        "domestic.shipping.section.optional_additional_services.cash_on_delivery",
                      )}
                      checked={additionalService === "PaymentControl"}
                      value={additionalService}
                      onChange={(e) => {
                        if (additionalService === "") {
                          setValue("additionalService", "PaymentControl", {
                            shouldDirty: true,
                          });
                        } else if (additionalService !== "PaymentControl") {
                          setValue("additionalService", "PaymentControl", {
                            shouldDirty: true,
                          });
                        } else {
                          setValue("additionalService", "", {
                            shouldDirty: true,
                          });
                        }
                      }}
                    />
                    <s-checkbox
                      label={t(
                        "domestic.shipping.section.optional_additional_services.return_delivery",
                      )}
                      checked={additionalService === "MoneyTransfer"}
                      value={additionalService}
                      onChange={(e) => {
                        if (additionalService === "") {
                          setValue("additionalService", "MoneyTransfer", {
                            shouldDirty: true,
                          });
                        } else if (additionalService !== "MoneyTransfer") {
                          setValue("additionalService", "MoneyTransfer", {
                            shouldDirty: true,
                          });
                        } else {
                          setValue("additionalService", "", {
                            shouldDirty: true,
                          });
                        }
                      }}
                    />
                    <s-checkbox
                      label={t(
                        "domestic.shipping.section.optional_additional_services.declared_price.title",
                      )}
                      checked={additionalService === "DeclaredPrice"}
                      value={additionalService}
                      onChange={(e) => {
                        if (additionalService === "") {
                          setValue("additionalService", "DeclaredPrice", {
                            shouldDirty: true,
                          });
                        } else if (additionalService !== "DeclaredPrice") {
                          setValue("additionalService", "DeclaredPrice", {
                            shouldDirty: true,
                          });
                        } else {
                          setValue("additionalService", "", {
                            shouldDirty: true,
                          });
                        }
                      }}
                    />
                  </s-stack>
                  {additionalService === "MoneyTransfer" ? (
                    <s-stack direction="block" gap="small-500">
                      <s-text>
                        {t(
                          "domestic.shipping.section.optional_additional_services.comission_pays.title",
                        )}
                      </s-text>
                      <s-stack
                        direction="inline"
                        gap="small-200"
                        alignItems="center"
                      >
                        <s-text>
                          {t(
                            "domestic.shipping.section.optional_additional_services.comission_pays.recipient",
                          )}
                        </s-text>
                        <s-switch
                          label={t(
                            "domestic.shipping.section.optional_additional_services.comission_pays.sender",
                          )}
                          onChange={() => {
                            if (commisionPayer === "Sender") {
                              setValue("comissionPayer", "Recipient", {
                                shouldDirty: true,
                              });
                            } else {
                              setValue("comissionPayer", "Sender", {
                                shouldDirty: true,
                              });
                            }
                          }}
                        />
                      </s-stack>
                    </s-stack>
                  ) : (
                    additionalService === "DeclaredPrice" && (
                      <s-box inlineSize="200px">
                        <s-money-field
                          label={t(
                            "domestic.shipping.section.optional_additional_services.declared_price.price",
                          )}
                          value={declaredPriceAmount}
                          onChange={(e) =>
                            setValue(
                              "declaredPriceAmount",
                              e.currentTarget.value,
                              { shouldDirty: true },
                            )
                          }
                          autocomplete="off"
                        ></s-money-field>
                      </s-box>
                    )
                  )}
                </s-stack>
              </s-section>
            </s-grid-item>
          </s-grid>
          <s-divider color="strong" />
          <s-grid gridTemplateColumns="3fr 1fr" gap="base">
            <s-grid-item>
              <s-section
                heading={
                  shippingType === "Door"
                    ? t("domestic.shipping.section.pickup_address.title")
                    : t("domestic.shipping.section.dispatch_address.title")
                }
              >
                {shippingType === "Door" ? (
                  <s-stack direction="block" gap="base">
                    <Autocomplete
                      id="settlement"
                      label={t(
                        "domestic.shipping.section.pickup_address.settlement",
                      )}
                      modalHeading={t(
                        "domestic.shipping.component.settlement.modal.title",
                      )}
                      placeholder={t(
                        "domestic.shipping.component.settlement.clickable.placeholder",
                      )}
                      searchPlaceholder={t(
                        "domestic.shipping.component.settlement.modal.search",
                      )}
                      selected={settlement}
                      onSelected={(value) => setValue("settlement", value)}
                      options={[
                        { label: "Київ", value: "123fkdpsfsd" },
                        { label: "Харків", value: "123fkdpsfss" },
                        { label: "Одеса", value: "123fkdpsfsg" },
                        { label: "Львів", value: "123fkdpsf23" },
                      ]}
                      defaultOptions={[
                        { label: "Київ", value: "123fkdpsfsd" },
                        { label: "Харків", value: "123fkdpsfss" },
                        { label: "Одеса", value: "123fkdpsfsg" },
                        { label: "Львів", value: "123fkdpsf23" },
                      ]}
                      shortcuts={[
                        { label: "Київ", value: "49gerjgl32" },
                        { label: "Харків", value: "41gerjgl32" },
                        { label: "Одеса", value: "44gerjgl32" },
                        { label: "Львів", value: "47gerjgl32" },
                      ]}
                      required
                    />
                    <Autocomplete
                      id="street"
                      label={t(
                        "domestic.shipping.section.pickup_address.street",
                      )}
                      modalHeading={t(
                        "domestic.shipping.component.street.modal.title",
                      )}
                      placeholder={t(
                        "domestic.shipping.component.street.clickable.placeholder",
                      )}
                      searchPlaceholder={t(
                        "domestic.shipping.component.street.modal.search",
                      )}
                      options={[
                        { label: "Академіка Вільямса", value: "312gregeiro" },
                        { label: "Адмірала Макарова", value: "65fvdkgwe1" },
                        { label: "Квіткова", value: "69021fsdlkng" },
                      ]}
                      defaultOptions={[
                        { label: "Академіка Вільямса", value: "312gregeiro" },
                        { label: "Адмірала Макарова", value: "65fvdkgwe1" },
                        { label: "Квіткова", value: "69021fsdlkng" },
                      ]}
                      selected={street}
                      onSelected={(value) => setValue("street", value)}
                      required
                    />
                    <s-text-field
                      label={t(
                        "domestic.shipping.section.pickup_address.building",
                      )}
                      required
                      autocomplete="off"
                    />
                    <s-text-field
                      label={t(
                        "domestic.shipping.section.pickup_address.apartment",
                      )}
                      autocomplete="off"
                    />
                  </s-stack>
                ) : (
                  <s-stack direction="block" gap="base">
                    <Autocomplete
                      id="settlement"
                      label={t(
                        "domestic.shipping.section.dispatch_address.settlement",
                      )}
                      modalHeading={t(
                        "domestic.shipping.component.settlement.modal.title",
                      )}
                      placeholder={t(
                        "domestic.shipping.component.settlement.clickable.placeholder",
                      )}
                      searchPlaceholder={t(
                        "domestic.shipping.component.settlement.modal.search",
                      )}
                      selected={settlement}
                      onSelected={(value) => setValue("settlement", value)}
                      options={[
                        { label: "Київ", value: "49gerjgl32" },
                        { label: "Харків", value: "41gerjgl32" },
                        { label: "Одеса", value: "44gerjgl32" },
                        { label: "Львів", value: "47gerjgl32" },
                      ]}
                      defaultOptions={[
                        { label: "Київ", value: "49gerjgl32" },
                        { label: "Харків", value: "41gerjgl32" },
                        { label: "Одеса", value: "44gerjgl32" },
                        { label: "Львів", value: "47gerjgl32" },
                      ]}
                      shortcuts={[
                        { label: "Київ", value: "49gerjgl32" },
                        { label: "Харків", value: "41gerjgl32" },
                        { label: "Одеса", value: "44gerjgl32" },
                        { label: "Львів", value: "47gerjgl32" },
                      ]}
                      required
                    />
                    <Autocomplete
                      id="warehouse"
                      label={t(
                        "domestic.shipping.section.dispatch_address.warehouse",
                      )}
                      modalHeading={t(
                        "domestic.shipping.component.warehouse.modal.title",
                      )}
                      placeholder={t(
                        "domestic.shipping.component.warehouse.clickable.placeholder",
                      )}
                      searchPlaceholder={t(
                        "domestic.shipping.component.warehouse.modal.search",
                      )}
                      selected={warehouse}
                      onSelected={(value) => setValue("warehouse", value)}
                      options={[
                        { label: "Київ №1", value: "765gfehter" },
                        { label: "Київ №2", value: "725gfehter" },
                        { label: "Київ №3", value: "745gfehter" },
                        { label: "Київ №4", value: "775gfehter" },
                      ]}
                      defaultOptions={[
                        { label: "Київ №1", value: "765gfehter" },
                        { label: "Київ №2", value: "725gfehter" },
                        { label: "Київ №3", value: "745gfehter" },
                        { label: "Київ №4", value: "775gfehter" },
                      ]}
                      required
                    />
                  </s-stack>
                )}
              </s-section>
            </s-grid-item>
            <s-grid-item>
              <s-section
                heading={t("domestic.shipping.section.pickup_location.title")}
              >
                <s-stack direction="block" gap="small">
                  <s-grid gridTemplateColumns="repeat(6, 1fr)">
                    <s-grid-item gridColumn="span 6">
                      <s-choice-list
                        label={t(
                          "domestic.shipping.section.pickup_location.pickup_type.title",
                        )}
                        name="shipping-type-choice-list"
                        onChange={(e) => {
                          const value = e.currentTarget
                            .values[0] as ShippingType;
                          setValue("shippingType", value, {
                            shouldDirty: true,
                          });
                          setValue;
                        }}
                      >
                        <s-choice
                          value="Warehouse"
                          defaultSelected={shippingType === "Warehouse"}
                        >
                          {t(
                            "domestic.shipping.section.pickup_location.pickup_type.warehouse",
                          )}
                        </s-choice>
                        <s-choice
                          value="Door"
                          defaultSelected={shippingType === "Door"}
                        >
                          {t(
                            "domestic.shipping.section.pickup_location.pickup_type.address",
                          )}
                        </s-choice>
                      </s-choice-list>
                    </s-grid-item>
                  </s-grid>
                </s-stack>
              </s-section>
            </s-grid-item>
          </s-grid>
        </s-stack>
        <UniformPackageModal
          heading={t("domestic.shipping.component.uniform_package.modal.title")}
          placeholder={t(
            "domestic.shipping.component.uniform_package.modal.search",
          )}
          selected={uniformPackage}
          onSelected={(value) => setValue("uniformPackage", value)}
          boxes={[
            {
              id: "8f49720a-cd66-442f-9b85-9dcce7e34f8b",
              description: "Коробка 4 кг пласка",
              length: "53.5",
              width: "38",
              height: "7.5",
              volumetricWeight: "4",
              external: false,
            },
            {
              id: "988f6991-1bd2-11e4-acce-0050568002cf",
              description: "Коробка (4кг) для ноутбука",
              length: "53.5",
              width: "38",
              height: "7.5",
              volumetricWeight: "4",
              external: true,
            },
          ]}
        />
        <ExtendedPackagingModal
          boxes={[
            {
              id: "8f49720a-cd66-442f-9b85-9dcce7e34f8b",
              description: "Коробка 4 кг пласка",
              length: "53.5",
              width: "38",
              height: "7.5",
              volumetricWeight: "4",
              external: false,
            },
            {
              id: "988f6991-1bd2-11e4-acce-0050568002cf",
              description: "Коробка (4кг) для ноутбука",
              length: "53.5",
              width: "38",
              height: "7.5",
              volumetricWeight: "4",
              external: true,
            },
          ]}
          onSelected={() => {}}
          selected={null}
        />
        <CreateBoxModal />
        <SaveBar id="shipping-settings-save-bar">
          <button
            variant="primary"
            // onClick={handleSaveSettings}
            // loading={
            //   fetcher.state === "submitting" || fetcher.state === "loading"
            //     ? ""
            //     : undefined
            // }
          />
          <button
            onClick={() => reset()}
            // loading={
            //   fetcher.state === "submitting" || fetcher.state === "loading"
            //     ? ""
            //     : undefined
            // }
          />
        </SaveBar>
      </s-box>
    </s-page>
  );
}
