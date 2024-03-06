import React, { ReducerState, useReducer } from "react";
import styles from "@/app/settings/Settings.module.css";
import { PropertyEditor } from "@/app/settings/PropertyEditor";
import { CssThemeVariables } from "@/shared/constants/themes";

interface Props {}

type State = typeof themeCssVariables;

// name: cssName
const themeCssVariables = {
  background: CssThemeVariables.Background,
  caret: CssThemeVariables.Caret,
  main: CssThemeVariables.Main,
  sub: CssThemeVariables.Sub,
  "sub alt": CssThemeVariables.SubAlt,
  text: CssThemeVariables.Text,
  error: CssThemeVariables.Error,
  "extra error": CssThemeVariables.ExtraError,
};

const reducer = (current: State, update: Partial<State>) => ({ ...current, ...update });

export const PropertyList: React.FC<Props> = ({}) => {
  const [state, dispatch] = useReducer(reducer, themeCssVariables as ReducerState<State>);
  return (
    <div className={styles.propertyList}>
      {Object.entries(state).map(([name, cssName]) => (
        <PropertyEditor name={name} cssName={cssName} key={cssName} />
      ))}
    </div>
  );
};
