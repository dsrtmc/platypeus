import React from "react";
import styles from "./Test.module.css";

interface Props {
  mode: string;
  selected: boolean;
  onSelect: (mode: string) => () => void;
}

export const ModeButton: React.FC<Props> = ({ mode, selected, onSelect }) => {
  return (
    <button onClick={onSelect(mode)} className={`${styles.modeButton} ${selected && styles.selected}`}>
      {mode}
    </button>
  );
};
