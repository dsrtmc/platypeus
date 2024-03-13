import React from "react";
import styles from "./Race.module.css";
import { CgSpinner } from "react-icons/cg";

interface Props {}

export const ChatboxFallback: React.FC<Props> = ({}) => {
  return (
    <div className={styles.chatbox}>
      <CgSpinner className={styles.spinner} />
    </div>
  );
};
