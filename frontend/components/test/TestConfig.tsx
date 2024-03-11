import React, { MouseEvent } from "react";
import { ModeSelection } from "@/components/test/ModeSelection";
import { LanguageSelection } from "@/components/test/LanguageSelection";
import { ModeSettingSelection } from "@/components/test/ModeSettingSelection";
import styles from "./Test.module.css";
import { TestLanguage, TestMode } from "@/shared/types/configTypes";

interface Props {
  language: string;
  mode: string;
  modeSetting: number;
  handleSelectLanguage: (language: TestLanguage) => void;
  handleSelectMode: (mode: TestMode) => void;
  handleSelectModeSetting: (modeSetting: number) => (e: MouseEvent<HTMLButtonElement>) => void;
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
