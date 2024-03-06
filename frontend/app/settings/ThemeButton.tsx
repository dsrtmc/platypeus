import React, { useEffect, useState } from "react";
import styles from "./Settings.module.css";
import { ThemeType } from "@/shared/constants/themes";
import { ConfigType } from "@/shared/types/configTypes";

// TODO: Could probably just pass `theme` as props but cba types are pissing me off
interface Props {
  themeName: string;
  themeConfig: ThemeType[keyof ThemeType];
}

export const ThemeButton: React.FC<Props> = ({ themeName, themeConfig }) => {
  // TODO: make selected actually usable
  const [selected, setSelected] = useState(false);
  function handleSelect(name: string, cfg: ThemeType[keyof ThemeType]) {
    return () => {
      let config: ConfigType = JSON.parse(localStorage.getItem("config"));
      for (const [property, val] of Object.entries(cfg)) {
        console.log("prop:", property, "val:", val);
        document.documentElement.style.setProperty(property, val);
        if (!config) {
          console.error("`config` has not been found in the local storage.");
          return;
        }
        config.themeName = name;
        config.themeConfig = { ...config.themeConfig, [property]: val };
      }
      localStorage.setItem("config", JSON.stringify(config));
    };
  }
  return (
    <button
      onClick={handleSelect(themeName, themeConfig)}
      className={`${styles.themeButton} ${selected && styles.selected}`}
      style={{ color: themeConfig["--main-color"], backgroundColor: themeConfig["--bg-color"] }}
      type={"button"}
    >
      {themeName}
    </button>
  );
};
