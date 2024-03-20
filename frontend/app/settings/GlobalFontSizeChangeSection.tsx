import React, { ChangeEvent, KeyboardEvent, useContext, useEffect, useState } from "react";
import styles from "@/app/settings/Settings.module.css";
import { DEFAULT_CONFIG, getConfig, setConfig } from "@/utils/configUtils";
import { NotificationContext, NotificationProvider } from "@/app/NotificationProvider";
import { ErrorContext } from "@/app/ErrorProvider";
import { ConfigCssVariable } from "@/shared/types/configTypes";

interface Props {}

const MIN_FONT_SIZE = 6;
const MAX_FONT_SIZE = 32;

// ridiculous name
export const GlobalFontSizeChangeSection: React.FC<Props> = ({}) => {
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
    if (numberValue < MIN_FONT_SIZE || numberValue > MAX_FONT_SIZE) {
      setError({ code: "INVALID_FONT_VALUE", message: "invalid font value." });
      return;
    }
    let config = getConfig();
    if (!config) {
      console.error("`config` has not been found in the local storage.");
      return;
    }
    const newFontSize = parseFloat(value);
    config.fontSize = newFontSize;
    setConfig(config);

    const root = document.documentElement;
    root.style.setProperty(ConfigCssVariable.FontSize, newFontSize + "px");

    setNotification({ message: "successfully changed font." });
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
    root.style.setProperty(ConfigCssVariable.FontSize, newFontSize + "px");
    setValue(newFontSize.toString());
  }

  useEffect(() => {
    const root = document.documentElement;
    const cs = getComputedStyle(root);
    let size = parseFloat(cs.fontSize);
    setValue(size.toString());
  }, []);

  return (
    <div className={styles.valueChangeWrapper}>
      <input
        value={value}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        className={styles.valueChangeField}
        type={"number"}
        min={MIN_FONT_SIZE}
        max={MAX_FONT_SIZE}
      />
      <button onClick={handleFontSizeChange} className={styles.valueChangeButton} type={"button"}>
        set font size
      </button>
      <button onClick={resetToDefault} className={styles.valueChangeButton}>
        reset to default
      </button>
    </div>
  );
};
