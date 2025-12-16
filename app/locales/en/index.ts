import type { ResourceLanguage } from "i18next";
import global from "./global";
import appSettings from "./app-settings";
import settings from "./settings";
import autoffSettings from "./autoff_settings";

export default {
  global,
  appSettings,
  settings,
  autoff_settings: autoffSettings,
} satisfies ResourceLanguage;
