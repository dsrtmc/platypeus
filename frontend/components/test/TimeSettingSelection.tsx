import { MouseEvent } from "react";
import styles from "./Test.module.css";
import { TimeSettingButton } from "@/components/test/TimeSettingButton";

interface Props {
  timeSettings: Array<number>;
  handleSelect: (time: number) => (e: MouseEvent<HTMLButtonElement>) => void;
}

export function TimeSettingSelection({ timeSettings, handleSelect }: Props) {
  return (
    <div className={styles.selection}>
      {timeSettings.map((timeSetting) => (
        <TimeSettingButton handleSelect={handleSelect(timeSetting)}>{timeSetting}</TimeSettingButton>
      ))}
    </div>
  );
}
