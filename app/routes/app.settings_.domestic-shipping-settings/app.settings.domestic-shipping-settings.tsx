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
import BoxModal from "./components/modals/box-modal";
import ExtendedBoxModal from "./components/modals/extended-box-modal";

type Props = {};

export default function DomesticShippingSettingsPage({}: Props) {
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
      deliveryPaymentType: "Cash",
      deliveryPayerType: "Sender",
      additionalService: "",
      declaredPriceAmount: "0",
      comissionPayer: "Recipient",
      shipperType: "Legal entity",
      shippingType: "Door",
    },
  });

  const watchedShipmentType = watch("shipmentType");
  const watchedPackingType = watch("packingType");
  const watchedDeliveryPaymentType = watch("deliveryPaymentType");
  const watchedShipperType = watch("shipperType");
  const watchedShippingType = watch("shippingType");
  const watchedAdditionalService = watch("additionalService");
  const watchedCommisionPayer = watch("comissionPayer");
  const watchedDeclaredPriceAmount = watch("declaredPriceAmount");

  useEffect(() => {
    if (isDirty) {
      shopify.saveBar.show("shipping-settings-save-bar");
    } else {
      shopify.saveBar.hide("shipping-settings-save-bar");
    }
  }, [isDirty]);

  const shipmentChoices: ShipmentType[] = [
    "Parcel",
    "Cargo",
    "Documents",
    "TiresWheels",
  ];

  const onShipmentTypeChange = (e: any) => {
    const value = e.currentTarget.values?.[0] as ShipmentType | undefined;
    if (!value) return;

    setValue("shipmentType", value, { shouldDirty: true });
  };

  console.log(watchedCommisionPayer);

  return (
    <s-page heading="Внутрішні методи доставки" inlineSize="large">
      <s-stack gap="base">
        <s-grid
          gridTemplateColumns="repeat(12, 1fr)"
          gap="base"
          gridTemplateRows="auto auto"
        >
          <s-grid-item gridColumn="span 9" gridRow="span 1">
            <s-section heading="Пакування">
              <s-stack direction="block" gap="base">
                <s-grid gridTemplateColumns="repeat(14, 1fr)" gap="none">
                  <s-grid-item gridColumn="span 12" gridRow="span 1">
                    <s-switch
                      label={"Розширене пакування"}
                      checked={watchedPackingType === "extended"}
                      value={watchedPackingType}
                      onChange={(e) => {
                        if (watchedPackingType === "default") {
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
                          <s-stack direction="block" gap="none">
                            <div style={{ visibility: "hidden" }}>
                              <s-text accessibilityVisibility="hidden">
                                {watchedPackingType === "default"
                                  ? "Загальне пакування"
                                  : "Розширене пакування"}
                              </s-text>
                            </div>
                            <s-clickable
                              border="base"
                              padding="small-300"
                              background="base"
                              borderRadius="small"
                              commandFor={
                                watchedPackingType === "default"
                                  ? "box-modal"
                                  : "extended-box-modal"
                              }
                            >
                              <s-text>
                                {watchedPackingType === "default"
                                  ? "Обрати пакування"
                                  : "Налаштувати пакування"}
                              </s-text>
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
                  <s-text-area label="Опис" autocomplete="off" />
                </s-box>
                <s-switch
                  label="Додавати артикули до відправлення"
                  details="Додавати артикули до опису та додаткової інформації про відправлення.
                  Увага! Якщо опис залишити порожнім, система автоматично заповнить його даними з замовлення та додасть артикули."
                />
              </s-stack>
            </s-section>
          </s-grid-item>
          <s-grid-item gridColumn="span 3" gridRow="span 2">
            <s-section heading="Відправлення">
              <s-stack direction="inline" gap="base">
                <s-choice-list
                  label="Тип відправлення"
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
                    defaultSelected={watchedShipmentType === "Parcel"}
                  >
                    Посилка
                  </s-choice>
                  <s-choice
                    value="Cargo"
                    defaultSelected={watchedShipmentType === "Cargo"}
                  >
                    Вантаж
                  </s-choice>
                  <s-choice
                    value="Documents"
                    defaultSelected={watchedShipmentType === "Documents"}
                  >
                    Документи
                  </s-choice>
                  <s-choice
                    value="TiresWheels"
                    defaultSelected={watchedShipmentType === "TiresWheels"}
                  >
                    Шини/Диски
                  </s-choice>
                  <s-choice
                    value="Pallet"
                    defaultSelected={watchedShipmentType === "Pallet"}
                  >
                    Палети
                  </s-choice>
                </s-choice-list>
                <s-stack direction="block" gap="base">
                  <s-choice-list
                    label="Спосіб оплати за доставку"
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
                      defaultSelected={watchedDeliveryPaymentType === "Cash"}
                    >
                      Готівка
                    </s-choice>
                    <s-choice
                      value="Cashless"
                      defaultSelected={
                        watchedDeliveryPaymentType === "Cashless"
                      }
                    >
                      Безготівковий
                    </s-choice>
                  </s-choice-list>
                  <s-choice-list
                    label="Платник за доставку"
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
                      defaultSelected={watchedDeliveryPaymentType === "Cash"}
                    >
                      Відправник
                    </s-choice>
                    <s-choice
                      value="Recipient"
                      defaultSelected={
                        watchedDeliveryPaymentType === "Cashless"
                      }
                    >
                      Отримувач
                    </s-choice>
                    <s-choice
                      value="ThirdPerson"
                      defaultSelected={
                        watchedDeliveryPaymentType === "Cashless"
                      }
                    >
                      Третя особа
                    </s-choice>
                  </s-choice-list>
                </s-stack>
              </s-stack>
            </s-section>
          </s-grid-item>
          <s-grid-item gridColumn="span 9" gridRow="span 2">
            <s-section heading="Бажані додаткові послуги" padding="base">
              <s-stack direction="block" gap="small-300">
                <s-stack direction="inline" gap="base">
                  <s-checkbox
                    label="Контроль оплати"
                    checked={watchedAdditionalService === "PaymentControl"}
                    value={watchedAdditionalService}
                    onChange={(e) => {
                      if (watchedAdditionalService === "") {
                        setValue("additionalService", "PaymentControl", {
                          shouldDirty: true,
                        });
                      } else if (
                        watchedAdditionalService !== "PaymentControl"
                      ) {
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
                    label="Грошовий переказ"
                    checked={watchedAdditionalService === "MoneyTransfer"}
                    value={watchedAdditionalService}
                    onChange={(e) => {
                      if (watchedAdditionalService === "") {
                        setValue("additionalService", "MoneyTransfer", {
                          shouldDirty: true,
                        });
                      } else if (watchedAdditionalService !== "MoneyTransfer") {
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
                    label="Оголошена вартість"
                    checked={watchedAdditionalService === "DeclaredPrice"}
                    value={watchedAdditionalService}
                    onChange={(e) => {
                      if (watchedAdditionalService === "") {
                        setValue("additionalService", "DeclaredPrice", {
                          shouldDirty: true,
                        });
                      } else if (watchedAdditionalService !== "DeclaredPrice") {
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
                {watchedAdditionalService === "MoneyTransfer" ? (
                  <s-stack direction="block" gap="small-500">
                    <s-text>Сплачує комісію за переказ</s-text>
                    <s-stack
                      direction="inline"
                      gap="small-200"
                      alignItems="center"
                    >
                      <s-text>Отримувач</s-text>
                      <s-switch label="Відправник" />
                      {/* <s-checkbox
                        label="Отримувач"
                        checked={watchedCommisionPayer === "Recipient"}
                        value={watchedCommisionPayer}
                        onChange={(e) => {
                          if (watchedCommisionPayer !== "Recipient") {
                            setValue("comissionPayer", "Recipient", {
                              shouldDirty: true,
                            });
                          } else {
                            return;
                          }
                        }}
                      />
                      <s-checkbox
                        label="Відправник"
                        checked={watchedCommisionPayer === "Sender"}
                        value={watchedCommisionPayer}
                        onChange={(e) => {
                          if (watchedCommisionPayer !== "Sender") {
                            setValue("comissionPayer", "Sender", {
                              shouldDirty: true,
                            });
                          } else {
                            return;
                          }
                        }}
                      /> */}
                    </s-stack>
                  </s-stack>
                ) : (
                  watchedAdditionalService === "DeclaredPrice" && (
                    <s-box inlineSize="200px">
                      <s-money-field
                        label="Ціна"
                        value={watchedDeclaredPriceAmount}
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
        <s-grid gridTemplateColumns="repeat(12, 1fr)" gap="base">
          <s-grid-item gridColumn="span 3">
            <s-section heading="Місце відправки">
              <s-stack direction="block" gap="small">
                <s-grid gridTemplateColumns="repeat(6, 1fr)">
                  <s-grid-item gridColumn="span 6">
                    <s-choice-list
                      label="Тип місця відправки"
                      name="shipping-type-choice-list"
                      onChange={(e) => {
                        const value = e.currentTarget.values[0] as ShippingType;
                        setValue("shippingType", value, {
                          shouldDirty: true,
                        });
                      }}
                    >
                      <s-choice
                        value="Warehouse"
                        defaultSelected={watchedShippingType === "Warehouse"}
                      >
                        Відділення
                      </s-choice>
                      <s-choice
                        value="Door"
                        defaultSelected={watchedShippingType === "Door"}
                      >
                        Адреса
                      </s-choice>
                    </s-choice-list>
                  </s-grid-item>
                </s-grid>
              </s-stack>
            </s-section>
          </s-grid-item>
          <s-grid-item gridColumn="span 9">
            <s-section heading="Адреса відправки">
              {watchedShippingType === "Door" ? (
                <s-grid
                  gridTemplateColumns="repeat(6, 1fr)"
                  gridTemplateRows="3"
                  gap="base"
                >
                  <s-grid-item gridColumn="span 3">
                    <s-text-field label="Регіон" autocomplete="off" />
                  </s-grid-item>
                  <s-grid-item gridColumn="span 3">
                    <s-text-field label="Місто" required autocomplete="off" />
                  </s-grid-item>
                  <s-grid-item gridColumn="span 3">
                    <s-text-field label="Вулиця" required autocomplete="off" />
                  </s-grid-item>
                  <s-grid-item gridColumn="span 3">
                    <s-text-field
                      label="Номер будинку"
                      required
                      autocomplete="off"
                    />
                  </s-grid-item>
                  <s-grid-item gridColumn="span 3">
                    <s-text-field
                      label="Поштовий індекс"
                      required
                      autocomplete="off"
                    />
                  </s-grid-item>
                </s-grid>
              ) : (
                <></>
              )}
            </s-section>
          </s-grid-item>
        </s-grid>
        <s-divider color="strong" />
        <s-grid
          gap="large"
          gridTemplateColumns={"repeat(12, 1fr)"}
          gridTemplateRows="2"
        >
          <s-grid-item gridColumn="span 3">
            <s-section heading="Відправник">
              <s-stack direction="block" gap="base">
                <s-choice-list
                  label="Тип"
                  name="shipper-type-choice-list"
                  onChange={(e) => {
                    const value = e.currentTarget.values[0] as ShipperType;
                    setValue("shipperType", value, {
                      shouldDirty: true,
                    });
                  }}
                >
                  <s-choice
                    defaultSelected={watchedShipperType === "Legal entity"}
                    value="Legal entity"
                  >
                    Юридична особа
                  </s-choice>
                  <s-choice
                    defaultSelected={watchedShipperType === "Private person"}
                    value="Private person"
                  >
                    Фізична особа
                  </s-choice>
                </s-choice-list>
              </s-stack>
            </s-section>
          </s-grid-item>
          {watchedShipperType === "Legal entity" ? (
            <s-grid-item gridColumn="span 9">
              <s-stack direction="block" gap="base">
                <s-section heading="Особисті дані">
                  <s-stack direction="block" gap="base">
                    <s-text-field
                      label="Назва компанії"
                      required
                      autocomplete="off"
                    />
                    <s-grid
                      gridTemplateColumns="repeat(12, 1fr)"
                      gridTemplateRows="2"
                      gap="base"
                    >
                      <s-grid-item gridColumn="span 6">
                        <s-text-field
                          label="Номер клієнта"
                          required
                          autocomplete="off"
                        />
                      </s-grid-item>
                      <s-grid-item gridColumn="span 6">
                        <s-text-field
                          label="Ідентифікаційний номер платника податків"
                          required
                          autocomplete="off"
                        />
                      </s-grid-item>
                    </s-grid>
                  </s-stack>
                </s-section>
                <s-section heading="Контактна особа">
                  <s-grid
                    gridTemplateColumns="repeat(12, 1fr)"
                    gridTemplateRows="2"
                    gap="base"
                  >
                    <s-grid-item gridColumn="span 6">
                      <s-text-field label="Ім'я" required />
                    </s-grid-item>
                    <s-grid-item gridColumn="span 6">
                      <s-text-field label="Прізвище" required />
                    </s-grid-item>
                    <s-grid-item gridColumn="span 6">
                      <PhoneTextField
                        label="Номер телефону"
                        countryCode={"UA"}
                      />
                    </s-grid-item>
                    <s-grid-item gridColumn="span 6">
                      <s-email-field
                        label="Електронна пошта"
                        autocomplete="off"
                      />
                    </s-grid-item>
                  </s-grid>
                </s-section>
              </s-stack>
            </s-grid-item>
          ) : (
            <s-grid-item gridColumn="span 9">
              <s-section heading="Особисті дані">
                <s-grid
                  gridTemplateColumns="repeat(12, 1fr)"
                  gridTemplateRows="2"
                  gap="base"
                >
                  <s-grid-item gridColumn="span 6">
                    <s-text-field label="Ім'я" />
                  </s-grid-item>
                  <s-grid-item gridColumn="span 6">
                    <s-text-field label="Прізвище" />
                  </s-grid-item>
                  <s-grid-item gridColumn="span 6">
                    <PhoneTextField label="Номер телефону" countryCode={"UA"} />
                  </s-grid-item>
                  <s-grid-item gridColumn="span 6">
                    <s-email-field
                      label="Електронна пошта"
                      autocomplete="off"
                    />
                  </s-grid-item>
                </s-grid>
              </s-section>
            </s-grid-item>
          )}
        </s-grid>
      </s-stack>
      <BoxModal />
      <ExtendedBoxModal />
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
    </s-page>
  );
}
