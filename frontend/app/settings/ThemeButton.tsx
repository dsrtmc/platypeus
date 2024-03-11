import React, { useState } from "react";
import styles from "./Settings.module.css";
import { ThemeConfigType } from "@/shared/types/configTypes";
import { ConfigType } from "@/shared/types/configTypes";
import { getConfig } from "@/utils/configUtils";

// TODO: Could probably just pass `theme` as props but cba types are pissing me off
interface Props {
  themeName: string;
  themeConfig: ThemeConfigType;
}

export const ThemeButton: React.FC<Props> = ({ themeName, themeConfig }) => {
  // TODO: make selected actually usable
  const [selected, _] = useState(false);
  function handleSelect() {
    let config = getConfig();
    for (const [property, val] of Object.entries(themeConfig)) {
      console.log("prop:", property, "val:", val);
      document.documentElement.style.setProperty(property, val);
      if (!config) {
        console.error("`config` has not been found in the local storage.");
        return;
      }
      config.themeName = themeName;
      // TODO: ↓ this feels funny, fix?
      config.themeConfig = { ...config.themeConfig, [property]: val };
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
