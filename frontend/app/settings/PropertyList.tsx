"use client";

import React from "react";
import styles from "@/app/settings/Settings.module.css";
import { PropertyEditor } from "@/app/settings/PropertyEditor";
import { CssThemeVariables } from "@/shared/constants/themes";
import { ThemeConfigType, ThemeCssVariable } from "@/shared/types/configTypes";
import { ThemeCssVariableToName } from "@/shared/types/configTypes";

interface Props {
  theme: ThemeConfigType | null;
}

export const PropertyList: React.FC<Props> = ({ theme }) => {
  if (!theme) return <div>no theme loaded yet lol</div>;
  return (
    <div className={styles.propertyList}>
      {Object.entries(theme).map(([cssName, config]) => (
        <PropertyEditor cssName={cssName as ThemeCssVariable} config={config} key={cssName} />
      ))}
    </div>
  );
};
