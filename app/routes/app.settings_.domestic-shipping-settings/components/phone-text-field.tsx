import React from "react";
import countryPhoneCode from "../../../assets/data/country-phone-codes.json" with { type: "json" };
import { CountryCode } from "../types";

type Props = {
  label: string;
  countryCode: CountryCode;
};

export default function PhoneTextField({ label, countryCode }: Props) {
  return (
    <s-text-field
      label={label}
      prefix={countryPhoneCode[countryCode]?.code || undefined}
      maxLength={countryPhoneCode[countryCode]?.phoneLength}
      minLength={countryPhoneCode[countryCode]?.phoneLength}
      required
      autocomplete="off"
    />
  );
}
