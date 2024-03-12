import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { DEFAULT_CONFIG, getConfig, setConfig } from "@/utils/configUtils";
import styles from "@/app/settings/Settings.module.css";

interface Props {}

export const WrapperSizeChangeSection: React.FC<Props> = ({}) => {
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
    let config = getConfig();
    if (!config) {
      console.error("`config` has not been found in the local storage.");
      return;
    }
    config.testFontSizeMultiplier = parseFloat(value);
    setConfig(config);

    const root = document.documentElement;
    root.style.setProperty("--test-font-size-multiplier", value);
  }

  function resetToDefault() {
    let config = getConfig();
    if (!config) {
      console.error("`config` has not been found in the local storage.");
      return;
    }
    const testFontSizeMultiplier = DEFAULT_CONFIG.testFontSizeMultiplier;
    config.testFontSizeMultiplier = testFontSizeMultiplier;
    setConfig(config);

    const root = document.documentElement;
    root.style.setProperty("--test-font-size-multiplier", testFontSizeMultiplier.toString());
    setValue(testFontSizeMultiplier.toString());
  }

  useEffect(() => {
    const root = document.documentElement;
    const cs = getComputedStyle(root);
    let testFontSizeMultiplier = cs.getPropertyValue("--test-font-size-multiplier");
    setValue(testFontSizeMultiplier);
  }, []);

  return (
    <div className={styles.fontSizeChangeWrapper}>
      <input
        value={value}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        className={styles.fontSizeChangeField}
        type={"number"}
        min={0.5}
        max={5}
        step={0.25}
      />
      <button onClick={handleFontSizeChange} className={styles.fontSizeChangeButton} type={"button"}>
        set wrapper's width
      </button>
      <button onClick={resetToDefault} className={styles.fontSizeChangeButton}>
        reset to default
      </button>
    </div>
  );
};
