export type ConfigType = {
  placeholder: string;
  themeConfig: {
    [key: string]: string;
  };
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