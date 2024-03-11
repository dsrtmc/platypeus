import React from "react";
import { WORD_LISTS } from "@/utils/wordLists";
import styles from "./Test.module.css";
import { FaCheck } from "react-icons/fa";
import { TestLanguage } from "@/shared/types/configTypes";

interface Props {
  list: typeof WORD_LISTS;
  selectedLanguage: string;
  handleSelectLanguage: (language: TestLanguage) => () => void;
}

export const LanguageList: React.FC<Props> = ({ list, selectedLanguage, handleSelectLanguage }) => {
  return (
    <div className={styles.languageList}>
      {Object.entries(list).map(([language, _]) => (
        <button
          onClick={handleSelectLanguage(language as TestLanguage)}
          className={styles.languageListItem}
          key={language}
        >
          {language} {selectedLanguage === language && <FaCheck style={{ fontSize: "0.8rem" }} />}
        </button>
      ))}
    </div>
  );
};
