import React from "react";
import { WORD_LISTS } from "@/utils/wordLists";
import styles from "./Test.module.css";

interface Props {
  list: typeof WORD_LISTS;
  handleSelectLanguage: (language: string) => () => void;
}

export const LanguageList: React.FC<Props> = ({ list, handleSelectLanguage }) => {
  return (
    <div className={styles.languageList}>
      {Object.entries(list).map(([language, _]) => (
        <button onClick={handleSelectLanguage(language)} className={styles.languageListItem} key={language}>
          {language}
        </button>
      ))}
    </div>
  );
};
