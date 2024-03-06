import { ConfigType } from "@/shared/types/configTypes";
import { THEMES } from "@/shared/constants/themes";

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
  testFontSizeMultiplier: 2,
};

export function makeConfig(): ConfigType {
  localStorage.setItem("config", JSON.stringify(DEFAULT_CONFIG));
  return DEFAULT_CONFIG;
}

export function getConfig(): ConfigType | null {
  if (typeof window === "undefined") return null;
  let config: ConfigType = JSON.parse(localStorage.getItem("config"));
  if (!config) {
    config = makeConfig();
  }
  return config;
}

// TODO: move it to another file
export function setConfig(config: ConfigType) {
  if (typeof window === "undefined") return;
  localStorage.setItem("config", JSON.stringify(config));
}
