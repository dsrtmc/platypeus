"use client";

import React, { useEffect, useState } from "react";
import styles from "@/app/settings/Settings.module.css";
import { PropertyList } from "@/app/settings/PropertyList";
import { ThemeList } from "@/app/settings/ThemeList";
import { THEMES } from "@/shared/constants/themes";
import { ThemeConfigType } from "@/shared/types/configTypes";
import { getConfig } from "@/utils/configUtils";

interface Props {}

export const ThemeConfigSection: React.FC<Props> = ({}) => {
  const [theme, setTheme] = useState<ThemeConfigType | null>(null);
  // only responsible for updating the theme preview; bad approach i guess but whatever
  function updateTheme(th: ThemeConfigType) {
    setTheme(th);
  }
  useEffect(() => {
    const config = getConfig();
    if (!config?.themeConfig) {
      console.error("`themeConfig` has not been found in the config.");
      return;
    }
    setTheme(config.themeConfig);
  }, []);
  return (
    <div className={styles.themeConfigSection}>
      <h1 className={styles.headerSmall}>theme</h1>
      <PropertyList theme={theme} />
      <ThemeList handleThemeUpdate={updateTheme} />
    </div>
  );
};
