"use client";

import React, { ReducerState, useReducer } from "react";

interface Props {}

const themeCssVariables = {
  background: "--bg-color",
  main: "--main-color",
  sub: "--sub-color",
  "sub alt": "--sub-alt-color",
  text: "--text-color",
  error: "--error-color",
  "extra error": "--error-extra-color",
};

type State = { [variable: keyof typeof themeCssVariables]: string };
const initialState: State = {
  background: "",
  main: "",
  sub: "",
  "sub alt": "",
  text: "",
  error: "",
  "extra error": "",
};

const reducer = (current: State, update: Partial<State>) => ({ ...current, ...update });

export default function SettingsPage() {
  const [state, dispatch] = useReducer(reducer, initialState as ReducerState<State>);
  const root = document.querySelector(":root");
  const cs = getComputedStyle(root);
  return (
    <div>
      {themeCssVariables.map((variable) => (
        <>
          <span>{variable}</span>
          <input type={"text"} />
        </>
      ))}
    </div>
  );
}
