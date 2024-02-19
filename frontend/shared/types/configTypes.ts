export type ConfigType = {
  placeholder: string;
  themeName: string;
  themeConfig: {
    [key: string]: string;
  };
  time: number;
  words: number;
  mode: string;
};

export type ThemeCssVariablesType = {
  background: "--bg-color";
  main: "--main-color";
  sub: "--sub-color";
  "sub alt": "--sub-alt-color";
  text: "--text-color";
  error: "--error-color";
  "extra error": "--error-extra-color";
};

type ThemeConfigType = {};
