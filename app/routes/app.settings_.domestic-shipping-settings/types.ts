import countryPhones from "../../assets/data/country-phone-codes.json" with { type: "json" };

type CountryPhoneInfo = {
  code: string;
  phoneLength: number;
};

type CountryPhoneMap = {
  [countryCode: string]: CountryPhoneInfo;
};

const COUNTRY_PHONE_MAP = countryPhones satisfies CountryPhoneMap;

export type CountryCode = keyof typeof COUNTRY_PHONE_MAP;

export type ShipperType = "Legal entity" | "Private person";

export type ShippingType = "Door" | "Warehouse";
export type PackingType = "default" | "extended";
export type ShipmentType =
  | "Parcel"
  | "Cargo"
  | "Documents"
  | "TiresWheels"
  | "Pallet";
export type DeliveryPaymentType = "Cash" | "Cashless";
export type DeliveryPayerType = "Sender" | "Recipient" | "ThirdPerson";
export type AdditionalServiceType =
  | "PaymentControl"
  | "MoneyTransfer"
  | "DeclaredPrice"
  | "";
export type ComissionPayerType = "Sender" | "Recipient";
export type FormValues = {
  shipmentType: ShipmentType;
  packingType: PackingType;
  deliveryPayerType: DeliveryPayerType;
  deliveryPaymentType: DeliveryPaymentType;
  additionalService: AdditionalServiceType;
  comissionPayer: ComissionPayerType;
  declaredPriceAmount: string;
  shipperType: ShipperType;
  shippingType: ShippingType;
};
