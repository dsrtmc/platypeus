"use client";

import React, { ReducerState, useEffect, useReducer } from "react";
import { PropertyEditor } from "@/app/settings/PropertyEditor";

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

  /*
    --bg-color: #323437;
    --main-color: #e2b714;
    --caret-color: #e2b714;
    --sub-color: #646669;
    --sub-alt-color: #2c2e31;
    --text-color: #d1d0c5;
    --error-color: #ca4754;
    --error-extra-color: #7e2a33;
    --colorful-error-color: #ca4754;
    --colorful-error-extra-color: #7e2a33;
   */
  // TODO: TEMPORARY // REMOVE
  function resetToDefaultTheme() {
    console.log("Config pre:", localStorage.getItem("config"));
    const defaultTheme = {
      "--bg-color": "#242933",
      "--main-color": "#ec4c56",
      "--caret-color": "#ec4c56",
      "--sub-color": "#596172",
      "--sub-alt-color": "#1c222d",
      "--text-color": "#f6f0e9",
      "--error-color": "#ec4c56",
      "--error-extra-color": "#9b333a",
    };
    let config = JSON.parse(localStorage.getItem("config"));
    console.log(Object.entries(defaultTheme));
    for (const [property, val] of Object.entries(defaultTheme)) {
      console.log("prop:", property, "val:", val);
      document.documentElement.style.setProperty(property, val);
      if (!config) {
        console.error("`config` has not been found in the local storage.");
        return;
      }
      config.themeConfig = { ...config.themeConfig, [property]: val };
    }
    localStorage.setItem("config", JSON.stringify(config));
    console.log("Config post:", localStorage.getItem("config"));
  }
  return (
    <div>
      {Object.entries(state).map(([name, cssName]) => (
        <PropertyEditor name={name} cssName={cssName} key={cssName} />
      ))}
      <button onClick={() => resetToDefaultTheme()}>reset to default</button>
    </div>
  );
}
