import { MouseEvent } from "react";
import styles from "./Test.module.css";
import { TimeSettingButton } from "@/components/test/TimeSettingButton";

interface Props {
  timeSettings: Array<number>;
  currentTimeSetting: number;
  handleSelect: (time: number) => (e: MouseEvent<HTMLButtonElement>) => void;
}

export function TimeSettingSelection({ timeSettings, currentTimeSetting, handleSelect }: Props) {
  return (
    <div className={styles.selection}>
      {timeSettings.map((timeSetting) => (
        <TimeSettingButton
          handleSelect={handleSelect(timeSetting)}
          selected={timeSetting == currentTimeSetting}
          key={timeSetting}
        >
          {timeSetting}
        </TimeSettingButton>
      ))}
    </div>
  );
}
