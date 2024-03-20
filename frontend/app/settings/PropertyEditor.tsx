"use client";

import React, { FormEvent, KeyboardEvent, useEffect, useState } from "react";
import styles from "./Settings.module.css";
import { getConfig, setConfig } from "@/utils/configUtils";
import { ThemeCssVariable, ThemeCssVariableToName } from "@/shared/types/configTypes";

interface Props {
  cssName: ThemeCssVariable;
  config: string;
}

export const PropertyEditor: React.FC<Props> = ({ cssName, config }) => {
  console.log("it should rerender, because the theme changed");
  console.log("config:", config);
  const [value, setValue] = useState(config);
  console.log("value:", value);

  // NOTE: is it bad to getComputedStyle() per every component? unlikely to cause performance issues but keep it in mind
  // useEffect(() => {
  //   const root = document.documentElement;
  //   const cs = getComputedStyle(root);
  //   setValue(cs.getPropertyValue(cssName));
  // }, []);

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      changePropertyValue(cssName, (e.target as HTMLInputElement).value);
    }
  }

  function handleColorInput(e: FormEvent<HTMLInputElement>) {
    changePropertyValue(cssName, (e.target as HTMLInputElement).value);
  }

  // Changes the value in the CSS & the `PropertyEditor` component, updates the config in localStorage
  function changePropertyValue(property: string, val: string) {
    document.documentElement.style.setProperty(property, val);
    setValue(val);
    let config = getConfig();
    if (!config) {
      console.error("`config` has not been found in the local storage.");
      return;
    }
    config.themeConfig = { ...config.themeConfig, [property]: val };
    setConfig(config);
  }

  useEffect(() => {
    setValue(config);
  }, [config]);

  return (
    <div className={styles.propertyBox}>
      <div className={styles.name}>{ThemeCssVariableToName[cssName]}</div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className={styles.field}
      />
      <input type={"color"} value={value} onInput={handleColorInput} className={styles.colorInput} />
    </div>
  );
};
