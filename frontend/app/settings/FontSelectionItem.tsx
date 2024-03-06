import React, { PropsWithChildren } from "react";
import styles from "./Settings.module.css";

interface Props {
  selected: boolean;
  handleFontChange: () => void;
}

export function FontSelectionItem({ selected, children, handleFontChange }: PropsWithChildren<Props>) {
  return (
    <button onClick={handleFontChange} className={`${styles.fontSelectionItem} ${selected && styles.selected}`}>
      {children}
    </button>
  );
}
