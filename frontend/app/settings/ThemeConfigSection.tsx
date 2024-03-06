import React from "react";
import styles from "@/app/settings/Settings.module.css";
import { PropertyList } from "@/app/settings/PropertyList";
import { ThemeList } from "@/app/settings/ThemeList";

interface Props {}

export const ThemeConfigSection: React.FC<Props> = ({}) => {
  return (
    <div className={styles.themeConfigSection}>
      <h1 className={styles.headerSmall}>theme</h1>
      <PropertyList />
      <ThemeList />
    </div>
  );
};
