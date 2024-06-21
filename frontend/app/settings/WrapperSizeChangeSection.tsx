"use client";

import React, { ChangeEvent, KeyboardEvent, useContext, useEffect, useState } from "react";
import { DEFAULT_CONFIG, getConfig, setConfig } from "@/utils/configUtils";
import styles from "@/app/settings/Settings.module.css";
import { ConfigCssVariable } from "@/shared/types/configTypes";
import { ErrorContext } from "@/app/ErrorProvider";
import { NotificationContext } from "@/app/NotificationProvider";

const MIN_WRAPPER_WIDTH = 720;
const MAX_WRAPPER_WIDTH = 1920;

interface Props {}

export const WrapperSizeChangeSection: React.FC<Props> = ({}) => {
  const { setError } = useContext(ErrorContext)!;
  const { setNotification } = useContext(NotificationContext)!;
  const [value, setValue] = useState("");

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleWrapperSizeChange();
    }
  }

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  function handleWrapperSizeChange() {
    let config = getConfig();
    if (!config) {
      console.error("`config` has not been found in the local storage.");
      return;
    }
    const numberValue = parseFloat(value);
    if (numberValue < MIN_WRAPPER_WIDTH || numberValue > MAX_WRAPPER_WIDTH) {
      setError({
        code: "INVALID_WRAPPER_WIDTH",
        message: `invalid wrapper width. min: ${MIN_WRAPPER_WIDTH}, max: ${MAX_WRAPPER_WIDTH}`,
      });
      return;
    }
    config.wrapperWidth = numberValue;
    setConfig(config);

    const root = document.documentElement;
    root.style.setProperty(ConfigCssVariable.WrapperWidth, value + "px");

    setNotification({ message: "successfully changed wrapper width." });
  }

  function resetToDefault() {
    let config = getConfig();
    if (!config) {
      console.error("`config` has not been found in the local storage.");
      return;
    }
    const wrapperWidth = DEFAULT_CONFIG.wrapperWidth;
    config.wrapperWidth = wrapperWidth;
    setConfig(config);

    const root = document.documentElement;
    root.style.setProperty(ConfigCssVariable.WrapperWidth, wrapperWidth + "px");
    setValue(wrapperWidth.toString());
  }

  useEffect(() => {
    const root = document.documentElement;
    const cs = getComputedStyle(root);
    let wrapperWidth = parseFloat(cs.getPropertyValue(ConfigCssVariable.WrapperWidth)); // just removing the `px` suffix would be better, but who cares
    setValue(wrapperWidth.toString());
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
      <button onClick={handleWrapperSizeChange} className={styles.valueChangeButton} type={"button"}>
        set wrapper's width
      </button>
      <button onClick={resetToDefault} className={styles.valueChangeButton}>
        reset to default
      </button>
    </div>
  );
};
