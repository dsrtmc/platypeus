import React, { PropsWithChildren } from "react";
import styles from "@/app/user/[username]/User.module.css";

interface Props {
  selected: boolean;
  handleSelectMode: () => void;
}

export const SelectModeButton: React.FC<Props> = ({
  selected,
  children,
  handleSelectMode,
}: PropsWithChildren<Props>) => {
  return (
    <button onClick={handleSelectMode} className={`${styles.selectModeButton} ${selected && styles.selected}`}>
      {children}
    </button>
  );
};
