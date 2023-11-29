"use client";

import React, { FC, useState } from "react";
import styles from "../Races.module.css";
import {
  MeQuery,
  OnChatboxEventDocument,
  OnRaceJoinLeaveSubscription,
  SendMessageDocument,
} from "@/graphql/generated/graphql";
import { useMutation, useSubscription } from "@apollo/client";

interface Props {
  chatboxId: OnRaceJoinLeaveSubscription["onRaceJoinLeave"]["chatboxId"];
  meData: MeQuery; // TODO: probably stupid? idk maybe not LOL idk maybe
}

export const Chatbox: FC<Props> = ({ chatboxId, meData }) => {
  const [value, setValue] = useState("");
  const [sendMessage, _] = useMutation(SendMessageDocument);
  const { data, loading, error } = useSubscription(OnChatboxEventDocument, {
    variables: {
      chatboxId,
    },
  });
  return (
    <div className={styles.chatbox}>
      {data?.onChatboxEvent.messages
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        .map((message) => (
          <div key={message.id}>
            {message.author.username}: {message.content}
          </div>
        ))}
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button
        onClick={async () => {
          console.log("Chatbox id:", chatboxId);
          await sendMessage({
            variables: {
              input: {
                content: value,
                userId: meData.me!.id,
                chatboxId,
              },
            },
          });
        }}
      >
        send message
      </button>
    </div>
  );
};
