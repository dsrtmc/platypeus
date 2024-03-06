import React from "react";
import styles from "@/app/settings/Settings.module.css";
import { THEMES } from "@/shared/constants/themes";
import { ThemeButton } from "@/app/settings/ThemeButton";

interface Props {}

export const ThemeList: React.FC<Props> = ({}) => {
  return (
    <div className={styles.themeList}>
      {Object.entries(THEMES).map(([name, config]) => (
        <ThemeButton themeName={name} themeConfig={config} />
      ))}
    </div>
  );
};
