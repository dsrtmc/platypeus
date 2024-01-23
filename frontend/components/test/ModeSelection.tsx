import React from "react";

interface Props {
  handleSelectMode: (mode: string) => void;
}

export const ModeSelection: React.FC<Props> = ({ handleSelectMode }) => {
  function onSelectMode(mode: string) {
    return () => handleSelectMode(mode);
  }
  return (
    <div>
      <button onClick={onSelectMode("time")}>time</button>
      <button onClick={onSelectMode("words")}>words</button>
    </div>
  );
};
