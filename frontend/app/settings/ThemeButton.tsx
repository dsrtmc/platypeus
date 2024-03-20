import React, { useState } from "react";
import styles from "./Settings.module.css";
import { ThemeConfigType } from "@/shared/types/configTypes";
import { ConfigType } from "@/shared/types/configTypes";
import { getConfig } from "@/utils/configUtils";
import { object } from "prop-types";

interface Props {
  theme: [string, ThemeConfigType];
  handleThemeUpdate: (theme: ThemeConfigType) => void;
}

export const ThemeButton: React.FC<Props> = ({ theme, handleThemeUpdate }) => {
  // TODO: make selected actually usable
  const [selected, _] = useState(false);
  const [themeName, themeConfig] = theme;
  function handleSelect() {
    handleThemeUpdate(themeConfig);
    let config = getConfig();
    for (const [property, value] of Object.entries(themeConfig)) {
      console.log("prop:", property, "val:", value);
      document.documentElement.style.setProperty(property, value);
      if (!config) {
        console.error("`config` has not been found in the local storage.");
        return;
      }
      config.themeName = themeName;
      // TODO: ↓ this feels funny, fix?
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
