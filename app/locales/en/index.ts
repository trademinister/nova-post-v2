import type { ResourceLanguage } from "i18next";
import global from "./global";
import appSettings from "./app-settings";
import settings from "./settings";
import autoffSettings from "./autoff_settings";
import shippingSettings from "./shipping-settings";
import deliverySettings from "./delivery-settings";

export default {
  global,
  appSettings,
  settings,
  autoff_settings: autoffSettings,
  shipping_settings: shippingSettings,
  delivery_settings: deliverySettings,
} satisfies ResourceLanguage;
