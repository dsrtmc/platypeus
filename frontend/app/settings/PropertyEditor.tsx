import React, { KeyboardEvent, useEffect, useState } from "react";
import styles from "./Settings.module.css";

interface Props {
  name: string;
  cssName: string;
}

export const PropertyEditor: React.FC<Props> = ({ name, cssName }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    const root = document.documentElement;
    const cs = getComputedStyle(root);
    setValue(cs.getPropertyValue(cssName));
  }, []);

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      const root = document.documentElement;
      root.style.setProperty(cssName, e.target.value);
      setValue(e.target.value);
      console.log("css name", cssName);
      console.log("root style property:", root.style.getPropertyValue(cssName));
    }
  }

  function changePropertyValue(property: string, val: string) {
    document.documentElement.style.setProperty(property, val);
    setValue(val);
  }

  return (
    <div className={styles.box}>
      {name}
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className={styles.field}
      />
      {/* TODO: doesn't work, fix this one */}
      <input
        type={"color"}
        value={value}
        onInput={(e) => changePropertyValue(cssName, e.target.value)}
        id={`${name}-input`}
      />
      <label htmlFor={`#${name}-input`} />
    </div>
  );
};
