import React, { MouseEvent } from "react";
import { ModeSelection } from "@/components/test/ModeSelection";
import { LanguageSelection } from "@/components/test/LanguageSelection";
import { ModeSettingSelection } from "@/components/test/ModeSettingSelection";
import styles from "./Test.module.css";

interface Props {
  language: string;
  mode: string;
  modeSetting: number;
  handleSelectLanguage: (language: string) => void;
  handleSelectMode: (mode: string) => void;
  handleSelectModeSetting: (time: number) => (e: MouseEvent<HTMLButtonElement>) => void;
}

export const TestConfig: React.FC<Props> = ({
  language,
  mode,
  modeSetting,
  handleSelectLanguage,
  handleSelectMode,
  handleSelectModeSetting,
}) => {
  return (
    <div className={styles.testConfig}>
      <LanguageSelection selectedLanguage={language} handleSelectLanguage={handleSelectLanguage} />
      <div className={styles.spacer} />
      <ModeSelection selectedMode={mode} handleSelectMode={handleSelectMode} />
      <div className={styles.spacer} />
      <ModeSettingSelection mode={mode} selectedSetting={modeSetting} handleSelect={handleSelectModeSetting} />
    </div>
  );
};
