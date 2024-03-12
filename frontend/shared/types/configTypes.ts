import { WORD_LISTS } from "@/utils/wordLists";

export type ConfigType = {
  placeholder: string;
  themeName: string;
  themeConfig: ThemeConfigType;
  time: number;
  words: number;
  mode: TestMode;
  language: TestLanguage;
  fontFamily: string;
  fontSize: number;
  wrapperWidth: number;
  testFontSizeMultiplier: number;
};

export type TestMode = "time" | "words";

export type TestLanguage = keyof typeof WORD_LISTS;

export type ThemeConfigType = {
  "--bg-color": string;
  "--main-color": string;
  "--caret-color": string;
  "--sub-color": string;
  "--sub-alt-color": string;
  "--text-color": string;
  "--error-color": string;
  "--error-extra-color": string;
};

export type ThemeCssVariablesType = {
  background: "--bg-color";
  "caret color": "--caret-color";
  main: "--main-color";
  sub: "--sub-color";
  "sub alt": "--sub-alt-color";
  text: "--text-color";
  error: "--error-color";
  "extra error": "--error-extra-color";
};

export enum ConfigCssVariables {
  FontFamily = "--font-family",
  FontSize = "--font-size",
  TestFontSizeMultiplier = "--test-font-size-multiplier",
  WrapperWidth = "--wrapper-width",
  CaretSpeed = "--caret-speed",
  Roundness = "--roundness",
}

export enum ThemeCssVariables {
  BackgroundColor = "--bg-color",
  CaretColor = "--caret-color",
  MainColor = "--main-color",
  SubColor = "--sub-color",
  SubAltColor = "--sub-alt-color",
  TextColor = "--text-color",
  ErrorColor = "--error-color",
  ExtraErrorColor = "--error-extra-color",
}
