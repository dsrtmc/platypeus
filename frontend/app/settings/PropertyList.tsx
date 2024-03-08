import React from "react";
import styles from "@/app/settings/Settings.module.css";
import { PropertyEditor } from "@/app/settings/PropertyEditor";
import { CssThemeVariables } from "@/shared/constants/themes";

interface Props {}

type State = typeof themeCssVariables;

// name: cssName
const themeCssVariables = {
  background: CssThemeVariables.Background,
  caret: CssThemeVariables.Caret,
  main: CssThemeVariables.Main,
  sub: CssThemeVariables.Sub,
  "sub alt": CssThemeVariables.SubAlt,
  text: CssThemeVariables.Text,
  error: CssThemeVariables.Error,
  "extra error": CssThemeVariables.ExtraError,
};

export const PropertyList: React.FC<Props> = ({}) => {
  return (
    <div className={styles.propertyList}>
      {Object.entries(themeCssVariables).map(([name, cssName]) => (
        <PropertyEditor name={name} cssName={cssName} key={cssName} />
      ))}
    </div>
  );
};
