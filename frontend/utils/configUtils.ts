import { ConfigType } from "@/shared/types/configTypes";
import { THEMES } from "@/shared/constants/themes";
import { config } from "dotenv";

export const DEFAULT_CONFIG: ConfigType = {
  placeholder: "placeholder",
  themeName: "default",
  themeConfig: THEMES.default,
  time: 5,
  words: 50,
  mode: "time",
  language: "english",
  fontFamily: "monospace",
  fontSize: 16,
  wrapperWidth: 1000,
  testFontSizeMultiplier: 2,
};

export function makeConfig(): ConfigType {
  localStorage.setItem("config", JSON.stringify(DEFAULT_CONFIG));
  return DEFAULT_CONFIG;
}

export function getConfig(): ConfigType | null {
  if (typeof window === "undefined") return null;
  let config: ConfigType | null = null;

  const configString = localStorage.getItem("config");
  if (configString) config = JSON.parse(configString);

  return config ?? makeConfig();
}

export function setConfig(config: ConfigType) {
  if (typeof window === "undefined") return;
  localStorage.setItem("config", JSON.stringify(config));
}
