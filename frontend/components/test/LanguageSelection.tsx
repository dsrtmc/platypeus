import React, { useState } from "react";
import styles from "./Test.module.css";
import { HiMiniLanguage } from "react-icons/hi2";
import { WORD_LISTS } from "@/utils/wordLists";
import { LanguageList } from "@/components/test/LanguageList";
import { Modal } from "@/components/Modal";
import { TestLanguage } from "@/shared/types/configTypes";

interface Props {
  selectedLanguage: string;
  handleSelectLanguage: (language: TestLanguage) => void;
}

export const LanguageSelection: React.FC<Props> = ({ selectedLanguage, handleSelectLanguage }) => {
  const [visibleModal, setVisibleModal] = useState(false);

  function onSelectLanguage(language: TestLanguage) {
    return () => {
      handleHideModal();
      handleSelectLanguage(language);
    };
  }

  function showModal() {
    setVisibleModal(true);
  }

  function handleHideModal() {
    setVisibleModal(false);
  }

  return (
    <div className={styles.mode}>
      <button onClick={showModal} className={styles.languageButton}>
        <HiMiniLanguage /> {selectedLanguage}
      </button>
      <Modal visible={visibleModal} handleHide={handleHideModal}>
        <LanguageList list={WORD_LISTS} selectedLanguage={selectedLanguage} handleSelectLanguage={onSelectLanguage} />
      </Modal>
    </div>
  );
};
