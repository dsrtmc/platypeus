import { MouseEvent } from "react";
import styles from "./Test.module.css";
import { ModeSettingButton } from "@/components/test/ModeSettingButton";

interface Props {
  mode: string;
  selectedSetting: number;
  handleSelect: (time: number) => (e: MouseEvent<HTMLButtonElement>) => void;
}

export function ModeSettingSelection({ mode, selectedSetting, handleSelect }: Props) {
  let modeSettings: number[] = [];
  switch (mode) {
    case "words":
      modeSettings = [10, 25, 50, 100];
      break;
    case "time":
      modeSettings = [5, 15, 30, 60];
      break;
    default:
      modeSettings = [5, 15, 30, 60];
  }
  return (
    <div className={styles.modeSettingSelection}>
      {modeSettings.map((modeSetting) => (
        <ModeSettingButton
          handleSelect={handleSelect(modeSetting)}
          selected={modeSetting === selectedSetting}
          key={modeSetting}
        >
          {modeSetting}
        </ModeSettingButton>
      ))}
    </div>
  );
}
