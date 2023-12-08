"use client";

import React, { ReducerState, useEffect, useReducer } from "react";
import { PropertyEditor } from "@/app/settings/PropertyEditor";

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

type State = typeof themeCssVariables;

const reducer = (current: State, update: Partial<State>) => ({ ...current, ...update });

export default function SettingsPage() {
  const [state, dispatch] = useReducer(reducer, themeCssVariables as ReducerState<State>);

  return (
    <div>
      {Object.entries(state).map(([name, cssName]) => (
        <PropertyEditor name={name} cssName={cssName} key={cssName} />
      ))}
    </div>
  );
}
