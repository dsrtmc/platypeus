import { MouseEvent } from "react";
import styles from "./Test.module.css";
import { TimeSettingButton } from "@/components/test/TimeSettingButton";

interface Props {
  settings: Array<number>;
  handleSelect: (time: number) => (e: MouseEvent<HTMLButtonElement>) => void;
}

export function TimeSettingSelection({ settings, handleSelect }: Props) {
  return (
    <div className={styles.selection}>
      {settings.map((setting) => (
        <TimeSettingButton handleSelect={handleSelect(setting)}>{setting}</TimeSettingButton>
      ))}
    </div>
  );
}
