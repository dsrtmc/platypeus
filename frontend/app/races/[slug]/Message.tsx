import React from "react";
import styles from "./Race.module.css";
import { Chatbox_OnChatboxEventSubscription } from "@/graphql/generated/graphql";

interface Props {
  message: NonNullable<
    NonNullable<Chatbox_OnChatboxEventSubscription["onChatboxEvent"]["messages"]>["edges"]
  >[number]["node"];
  viewerName: string | undefined;
}

export const Message: React.FC<Props> = ({ message, viewerName }) => {
  return (
    <li className={styles.message}>
      <span className={message.author.username === viewerName ? styles.me : styles.author}>
        {message.author.username}:
      </span>
      <span className={styles.content}>{message.content}</span>
    </li>
  );
};
