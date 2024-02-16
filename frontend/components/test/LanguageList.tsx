import React from "react";
import { WORD_LISTS } from "@/utils/wordLists";

interface Props {
  list: typeof WORD_LISTS;
  handleSelectLanguage: (language: string) => () => void;
}

export const LanguageList: React.FC<Props> = ({ list, handleSelectLanguage }) => {
  return Object.entries(list).map(([language, _]) => (
    <button onClick={handleSelectLanguage(language)} key={language}>
      {language}
    </button>
  ));
};
