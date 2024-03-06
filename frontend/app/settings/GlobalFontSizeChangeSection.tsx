import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import styles from "@/app/settings/Settings.module.css";
import { DEFAULT_CONFIG, getConfig, setConfig } from "@/utils/configUtils";
import { ConfigType } from "@/shared/types/configTypes";

interface Props {}

const MIN_FONT_SIZE = 6;
const MAX_FONT_SIZE = 48;

// ridiculous name
export const GlobalFontSizeChangeSection: React.FC<Props> = ({}) => {
  const [value, setValue] = useState("");

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleFontSizeChange();
    }
  }

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  function handleFontSizeChange() {
    if (value < MIN_FONT_SIZE || value > MAX_FONT_SIZE) return;
    let config = getConfig();
    if (!config) {
      console.error("`config` has not been found in the local storage.");
      return;
    }
    const newFontSize = parseFloat(value);
    config.fontSize = newFontSize;
    setConfig(config);

    const root = document.documentElement;
    root.style.setProperty("--font-size", newFontSize + "px");
  }

  function resetToDefault() {
    let config = getConfig();
    if (!config) {
      console.error("`config` has not been found in the local storage.");
      return;
    }
    const newFontSize = DEFAULT_CONFIG.fontSize;
    config.fontSize = newFontSize;
    setConfig(config);

    const root = document.documentElement;
    root.style.setProperty("--font-size", newFontSize + "px");
    setValue(newFontSize.toString());
  }

  useEffect(() => {
    const root = document.documentElement;
    const cs = getComputedStyle(root);
    console.log("cs font size:", cs.fontSize);
    let size = parseFloat(cs.fontSize);
    setValue(size.toString());
  }, []);

  return (
    <div className={styles.fontSizeChangeWrapper}>
      <input
        value={value}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        className={styles.fontSizeChangeField}
        type={"number"}
        min={MIN_FONT_SIZE}
        max={MAX_FONT_SIZE}
      />
      <button onClick={handleFontSizeChange} className={styles.fontSizeChangeButton} type={"button"}>
        set font size
      </button>
      <button onClick={resetToDefault} className={styles.fontSizeChangeButton}>
        reset to default
      </button>
    </div>
  );
};
