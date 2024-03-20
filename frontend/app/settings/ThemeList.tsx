import React from "react";
import styles from "@/app/settings/Settings.module.css";
import { THEMES } from "@/shared/constants/themes";
import { ThemeButton } from "@/app/settings/ThemeButton";
import { ThemeConfigType } from "@/shared/types/configTypes";

interface Props {
  handleThemeUpdate: (theme: ThemeConfigType) => void;
}

export const ThemeList: React.FC<Props> = ({ handleThemeUpdate }) => {
  return (
    <div className={styles.themeList}>
      {Object.entries(THEMES).map(([name, config]) => (
        <ThemeButton theme={[name, config]} handleThemeUpdate={handleThemeUpdate} key={name} />
      ))}
    </div>
  );
};
