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
  let config: ConfigType | null = null;

  // todo: could probably make it nicer with a clear head :P
  const configString = localStorage.getItem("config");
  if (configString) config = JSON.parse(configString);

  if (!config) {
    config = makeConfig();
  }
  return config;
}

export function setConfig(config: ConfigType) {
  if (typeof window === "undefined") return;
  localStorage.setItem("config", JSON.stringify(config));
}
