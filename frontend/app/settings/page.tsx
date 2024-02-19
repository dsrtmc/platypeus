"use client";

import React, { ReducerState, useEffect, useReducer } from "react";
import { PropertyEditor } from "@/app/settings/PropertyEditor";
import { THEMES, ThemeType } from "@/shared/constants/themes";
import styles from "./Settings.module.css";
import { ThemeButton } from "@/app/settings/ThemeButton";

interface Props {}

// name: cssName
const themeCssVariables = {
  background: "--bg-color",
  main: "--main-color",
  sub: "--sub-color",
  "sub alt": "--sub-alt-color",
  text: "--text-color",
  error: "--error-color",
  "extra error": "--error-extra-color",
};

type State = typeof themeCssVariables;

const reducer = (current: State, update: Partial<State>) => ({ ...current, ...update });

export default function SettingsPage() {
  const [state, dispatch] = useReducer(reducer, themeCssVariables as ReducerState<State>);
  return (
    <div className={styles.main}>
      <div className={styles.properties}>
        {Object.entries(state).map(([name, cssName]) => (
          <PropertyEditor name={name} cssName={cssName} key={cssName} />
        ))}
      </div>
      <div className={styles.themeList}>
        {Object.entries(THEMES).map(([name, config]) => (
          <ThemeButton themeName={name} themeConfig={config} />
        ))}
      </div>
    </div>
  );
}
