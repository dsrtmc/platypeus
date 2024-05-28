import React, { useState } from "react";
import styles from "./Settings.module.css";
import { ThemeConfigType } from "@/shared/types/configTypes";
import { getConfig } from "@/utils/configUtils";

interface Props {
  theme: [string, ThemeConfigType];
  selected: boolean;
  handleThemeUpdate: (theme: ThemeConfigType, name: string) => void;
}

export const ThemeButton: React.FC<Props> = ({ theme, selected, handleThemeUpdate }) => {
  // TODO: make selected actually usable
  const [themeName, themeConfig] = theme;
  function handleSelect() {
    handleThemeUpdate(themeConfig, themeName);
    let config = getConfig();
    for (const [property, value] of Object.entries(themeConfig)) {
      document.documentElement.style.setProperty(property, value);
      if (!config) {
        console.error("`config` has not been found in the local storage.");
        return;
      }
      config.themeName = themeName;
      config.themeConfig = { ...config.themeConfig, [property]: value };
    }
    localStorage.setItem("config", JSON.stringify(config));
  }
  return (
    <button
      onClick={handleSelect}
      className={`${styles.themeButton} ${selected && styles.selected}`}
      style={{ color: themeConfig["--main-color"], backgroundColor: themeConfig["--bg-color"] }}
      type={"button"}
    >
      {themeName}
    </button>
  );
};
