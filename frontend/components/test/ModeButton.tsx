import React from "react";
import styles from "./Test.module.css";
import { TestMode } from "@/shared/types/configTypes";

interface Props {
  mode: TestMode;
  selected: boolean;
  onSelect: (mode: TestMode) => () => void;
}

export const ModeButton: React.FC<Props> = ({ mode, selected, onSelect }) => {
  return (
    <button onClick={onSelect(mode)} className={`${styles.modeButton} ${selected && styles.selected}`}>
      {mode}
    </button>
  );
};
