import React, { useEffect, useState } from "react";
import styles from "@/app/settings/Settings.module.css";
import { THEMES } from "@/shared/constants/themes";
import { ThemeButton } from "@/app/settings/ThemeButton";
import { ThemeConfigType } from "@/shared/types/configTypes";
import { getConfig } from "@/utils/configUtils";

interface Props {
  handleThemeUpdate: (theme: ThemeConfigType) => void;
}

export const ThemeList: React.FC<Props> = ({ handleThemeUpdate }) => {
  const [themeName, setThemeName] = useState<string>("");
  // i hate react xd
  function onThemeUpdate(theme: ThemeConfigType, name: string) {
    handleThemeUpdate(theme);
    setThemeName(name);
  }

  useEffect(() => {
    let config = getConfig();
    if (!config) return;
    setThemeName(config.themeName);
  }, []);

  return (
    <div className={styles.themeList}>
      {Object.entries(THEMES).map(([name, config]) => (
        <ThemeButton
          theme={[name, config]}
          handleThemeUpdate={onThemeUpdate}
          selected={themeName === name}
          key={name}
        />
      ))}
    </div>
  );
};
