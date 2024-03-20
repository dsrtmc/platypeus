import { WORD_LISTS } from "@/utils/wordLists";

export enum ConfigCssVariable {
  FontFamily = "--font-family",
  FontSize = "--font-size",
  TestFontSizeMultiplier = "--test-font-size-multiplier",
  WrapperWidth = "--wrapper-width",
  CaretSpeed = "--caret-speed",
  Roundness = "--roundness",
}

export enum ThemeCssVariable {
  BackgroundColor = "--bg-color",
  CaretColor = "--caret-color",
  MainColor = "--main-color",
  SubColor = "--sub-color",
  SubAltColor = "--sub-alt-color",
  TextColor = "--text-color",
  ErrorColor = "--error-color",
  ExtraErrorColor = "--error-extra-color",
}

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
  [name in ThemeCssVariable]: string;
};

export const ThemeCssVariableToName: { [cssName in ThemeCssVariable]: string } = {
  [ThemeCssVariable.BackgroundColor]: "background",
  [ThemeCssVariable.MainColor]: "main",
  [ThemeCssVariable.CaretColor]: "caret color",
  [ThemeCssVariable.SubColor]: "sub",
  [ThemeCssVariable.SubAltColor]: "sub alt",
  [ThemeCssVariable.TextColor]: "text",
  [ThemeCssVariable.ErrorColor]: "error",
  [ThemeCssVariable.ExtraErrorColor]: "extra error",
};
