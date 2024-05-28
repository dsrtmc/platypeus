import React, { useState } from "react";
import styles from "@/app/settings/Settings.module.css";
import { THEMES } from "@/shared/constants/themes";
import { ThemeButton } from "@/app/settings/ThemeButton";
import { ThemeConfigType } from "@/shared/types/configTypes";

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
