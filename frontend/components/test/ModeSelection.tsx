import React from "react";
import styles from "./Test.module.css";
import { ModeButton } from "@/components/test/ModeButton";
import { TestMode } from "@/shared/types/configTypes";

interface Props {
  selectedMode: string;
  handleSelectMode: (mode: TestMode) => void;
}

export const ModeSelection: React.FC<Props> = ({ selectedMode, handleSelectMode }) => {
  function onSelectMode(mode: TestMode) {
    return () => handleSelectMode(mode);
  }
  return (
    <div className={styles.modeSelection}>
      {/* TODO: dynamic */}
      <ModeButton mode={"time"} selected={"time" === selectedMode} onSelect={onSelectMode} />
      <ModeButton mode={"words"} selected={"words" === selectedMode} onSelect={onSelectMode} />
      {/*<button onClick={onSelectMode("time")}>time</button>*/}
      {/*<button onClick={onSelectMode("words")}>words</button>*/}
    </div>
  );
};
