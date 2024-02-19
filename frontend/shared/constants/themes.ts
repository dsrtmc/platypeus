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
};
