import React from "react";
import styles from "./Test.module.css";
import { ModeButton } from "@/components/test/ModeButton";
import { TestMode } from "@/shared/types/configTypes";

interface Props {
  selectedMode: string;
  handleSelectMode: (mode: TestMode) => void;
}

export const ModeSelection: React.FC<Props> = ({ selectedMode, handleSelectMode }) => {
  const selection: Array<TestMode> = ["time", "words"];
  function onSelectMode(mode: TestMode) {
    return () => handleSelectMode(mode);
  }
  return (
    <div className={styles.modeSelection}>
      {selection.map((mode) => (
        <ModeButton mode={mode} selected={mode === selectedMode} onSelect={onSelectMode} />
      ))}
    </div>
  );
};
