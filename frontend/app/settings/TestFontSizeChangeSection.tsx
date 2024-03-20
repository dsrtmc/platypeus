import React, { ChangeEvent, KeyboardEvent, useContext, useEffect, useState } from "react";
import styles from "@/app/settings/Settings.module.css";
import { DEFAULT_CONFIG, getConfig, setConfig } from "@/utils/configUtils";
import { ErrorContext } from "@/app/ErrorProvider";
import { NotificationContext } from "@/app/NotificationProvider";
import { ConfigCssVariable } from "@/shared/types/configTypes";

interface Props {}

const MIN_TEST_FONT_SIZE = 0.5;
const MAX_TEST_FONT_SIZE = 5;

export const TestFontSizeChangeSection: React.FC<Props> = ({}) => {
  const { setError } = useContext(ErrorContext)!;
  const { setNotification } = useContext(NotificationContext)!;
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
    const numberValue = parseFloat(value);
    if (numberValue < MIN_TEST_FONT_SIZE || numberValue > MAX_TEST_FONT_SIZE) {
      setError({ code: "INVALID_FONT_VALUE", message: "invalid font value." });
      return;
    }

    let config = getConfig();
    if (!config) {
      console.error("`config` has not been found in the local storage.");
      return;
    }
    config.testFontSizeMultiplier = numberValue;
    setConfig(config);

    const root = document.documentElement;
    root.style.setProperty(ConfigCssVariable.TestFontSizeMultiplier, value);

    setNotification({ message: "successfully changed font." });
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
    root.style.setProperty(ConfigCssVariable.TestFontSizeMultiplier, testFontSizeMultiplier.toString());
    setValue(testFontSizeMultiplier.toString());
  }

  useEffect(() => {
    const root = document.documentElement;
    const cs = getComputedStyle(root);
    let testFontSizeMultiplier = cs.getPropertyValue(ConfigCssVariable.TestFontSizeMultiplier);
    setValue(testFontSizeMultiplier);
  }, []);

  return (
    <div className={styles.valueChangeWrapper}>
      <input
        value={value}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        className={styles.valueChangeField}
        type={"number"}
        min={0.5}
        max={5}
        step={0.25}
      />
      <button onClick={handleFontSizeChange} className={styles.valueChangeButton} type={"button"}>
        set test's font size
      </button>
      <button onClick={resetToDefault} className={styles.valueChangeButton}>
        reset to default
      </button>
    </div>
  );
};
