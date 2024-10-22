import { MouseEvent, PropsWithChildren } from "react";
import styles from "./Test.module.css";

interface Props {
  selected: boolean;
  handleSelect: (e: MouseEvent<HTMLButtonElement>) => void;
}

export function ModeSettingButton({ children, selected, handleSelect }: PropsWithChildren<Props>) {
  return (
    <button onClick={handleSelect} className={`${styles.modeSettingButton} ${selected && styles.selected}`}>
      {children}
    </button>
  );
}
