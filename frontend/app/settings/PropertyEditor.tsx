import React, { FormEvent, KeyboardEvent, useEffect, useState } from "react";
import styles from "./Settings.module.css";
import { getConfig, setConfig } from "@/utils/configUtils";

interface Props {
  name: string;
  cssName: string;
}

export const PropertyEditor: React.FC<Props> = ({ name, cssName }) => {
  const [value, setValue] = useState("");

  // NOTE: is it bad to getComputedStyle() per every component? unlikely to cause performance issues but keep it in mind
  useEffect(() => {
    const root = document.documentElement;
    const cs = getComputedStyle(root);
    setValue(cs.getPropertyValue(cssName));
  }, []);

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      const root = document.documentElement;
      const target = e.target as HTMLInputElement;
      root.style.setProperty(cssName, target.value);
      setValue(target.value);
      console.log("css name", cssName);
      console.log("root style property:", root.style.getPropertyValue(cssName));
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

  return (
    <div className={styles.propertyBox}>
      <div className={styles.name}>{name}</div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className={styles.field}
      />
      <input
        type={"color"}
        value={value}
        onInput={handleColorInput}
        id={`${name}-input`}
        className={styles.colorInput}
      />
    </div>
  );
};
