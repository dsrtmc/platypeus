import React, { PropsWithChildren } from "react";
import styles from "./Test.module.css";
import { HiMiniLanguage } from "react-icons/hi2";
import { WORD_LISTS } from "@/utils/wordLists";

interface Props {
  handleSelectLanguage: (language: string) => void;
}

export const LanguageSelection: React.FC<Props> = ({ handleSelectLanguage }) => {
  function onSelectLanguage(language: string) {
    return () => handleSelectLanguage(language);
  }
  return (
    <div className={styles.mode}>
      {Object.entries(WORD_LISTS).map(([language, _]) => (
        <button onClick={onSelectLanguage(language)}>
          <HiMiniLanguage /> {language}
        </button>
      ))}
    </div>
  );
};
