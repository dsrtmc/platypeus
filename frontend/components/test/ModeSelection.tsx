import React from "react";
import styles from "./Test.module.css";
import { ModeButton } from "@/components/test/ModeButton";

interface Props {
  selectedMode: string;
  handleSelectMode: (mode: string) => void;
}

export const ModeSelection: React.FC<Props> = ({ selectedMode, handleSelectMode }) => {
  function onSelectMode(mode: string) {
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
