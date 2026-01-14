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

export type Box = {
  id: string;
  description: string;
  length: string;
  width: string;
  height: string;
  volumetricWeight: string;
  external: boolean;
};

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
  uniformPackage: Box | null;
  deliveryPayerType: DeliveryPayerType;
  deliveryPaymentType: DeliveryPaymentType;
  additionalService: AdditionalServiceType;
  comissionPayer: ComissionPayerType;
  declaredPriceAmount: string;
  shipperType: ShipperType;
  shippingType: ShippingType;
  sender: { label: string; value: string } | null;
  settlement: { label: string; value: string } | null;
  street: { label: string; value: string } | null;
  warehouse: { label: string; value: string } | null;
};
