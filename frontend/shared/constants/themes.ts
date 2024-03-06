export enum CssThemeVariables {
  Background = "--bg-color",
  Caret = "--caret-color",
  Main = "--main-color",
  Sub = "--sub-color",
  SubAlt = "--sub-alt-color",
  Text = "--text-color",
  Error = "--error-color",
  ExtraError = "--error-extra-color",
}

export type ThemeType = {
  [name: string]: {
    "--bg-color": string;
    "--main-color": string;
    "--caret-color": string;
    "--sub-color": string;
    "--sub-alt-color": string;
    "--text-color": string;
    "--error-color": string;
    "--error-extra-color": string;
  };
};

export const THEMES: ThemeType = {
  default: {
    "--bg-color": "#242933",
    "--main-color": "#ec4c56",
    "--caret-color": "#ec4c56",
    "--sub-color": "#596172",
    "--sub-alt-color": "#1c222d",
    "--text-color": "#f6f0e9",
    "--error-color": "#ec4c56",
    "--error-extra-color": "#9b333a",
  },
  iceberg: {
    "--bg-color": "#e8e9ec",
    "--main-color": "#2d539e",
    "--caret-color": "#262a3f",
    "--sub-color": "#adb1c4",
    "--sub-alt-color": "#ccceda",
    "--text-color": "#33374c",
    "--error-color": "#cc517a",
    "--error-extra-color": "#cc3768",
  },
  pastel: {
    "--bg-color": "#e0b2bd",
    "--main-color": "#fbf4b6",
    "--caret-color": "#fbf4b6",
    "--sub-color": "#b4e9ff",
    "--sub-alt-color": "#d29fab",
    "--text-color": "#6d5c6f",
    "--error-color": "#ff6961",
    "--error-extra-color": "#c23b22",
  },
  dark: {
    "--bg-color": "#010203",
    "--main-color": "#383e42",
    "--caret-color": "#282e32",
    "--sub-color": "#5e676e",
    "--sub-alt-color": "#121212",
    "--text-color": "#383e42",
    "--error-color": "#5c1c2f",
    "--error-extra-color": "#38101c",
  },
  catppuccin: {
    "--bg-color": "#1e1e2e",
    "--main-color": "#abe9b3",
    "--caret-color": "#fae3b0",
    "--sub-color": "#575268",
    "--sub-alt-color": "#292739",
    "--text-color": "#d9e0ee",
    "--error-color": "#f28fad",
    "--error-extra-color": "#e8a2af",
  },
};
