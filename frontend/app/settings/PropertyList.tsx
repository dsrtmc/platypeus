import React, { ReducerState, useReducer } from "react";
import styles from "@/app/settings/Settings.module.css";
import { PropertyEditor } from "@/app/settings/PropertyEditor";

interface Props {}

type State = typeof themeCssVariables;

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

const reducer = (current: State, update: Partial<State>) => ({ ...current, ...update });

export const PropertyList: React.FC<Props> = ({}) => {
  const [state, dispatch] = useReducer(reducer, themeCssVariables as ReducerState<State>);
  return (
    <div className={styles.properties}>
      {Object.entries(state).map(([name, cssName]) => (
        <PropertyEditor name={name} cssName={cssName} key={cssName} />
      ))}
    </div>
  );
};
