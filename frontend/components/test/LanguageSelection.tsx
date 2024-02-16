import React, { PropsWithChildren, useState } from "react";
import styles from "./Test.module.css";
import { HiMiniLanguage } from "react-icons/hi2";
import { WORD_LISTS } from "@/utils/wordLists";
import { LanguageList } from "@/components/test/LanguageList";
import { Modal } from "@/components/Modal";

interface Props {
  selectedLanguage: string;
  handleSelectLanguage: (language: string) => void;
}

export const LanguageSelection: React.FC<Props> = ({ selectedLanguage, handleSelectLanguage }) => {
  function onSelectLanguage(language: string) {
    return () => {
      handleHideModal();
      handleSelectLanguage(language);
    };
  }
  // TODO: rename
  const [visibleModal, setVisibleModal] = useState(false);
  function toggleModal() {
    setVisibleModal((vm) => !vm);
  }

  function handleHideModal() {
    setVisibleModal(false);
  }
  return (
    <div className={styles.mode}>
      {/*{Object.entries(WORD_LISTS).map(([language, _]) => (*/}
      {/*  <button onClick={onSelectLanguage(language)}>*/}
      {/*    <HiMiniLanguage /> {language}*/}
      {/*  </button>*/}
      {/*))}*/}
      <button onClick={toggleModal} className={styles.languageButton}>
        <HiMiniLanguage /> {selectedLanguage}
      </button>
      <Modal visible={visibleModal} handleHide={handleHideModal}>
        <LanguageList list={WORD_LISTS} handleSelectLanguage={onSelectLanguage} />
      </Modal>
    </div>
  );
};
