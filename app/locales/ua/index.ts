import type { ResourceLanguage } from "i18next";
import translation from "./translation";
import global from "./global";
import appSettings from "./app-settings";
import settings from "./settings";

export default {
  translation,
  global,
  appSettings,
  settings,
} satisfies ResourceLanguage;
