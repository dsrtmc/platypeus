"use client";

import React, { FC, useState } from "react";
import styles from "../Races.module.css";
import {
  MeDocument,
  MeQuery,
  OnChatboxEventDocument,
  OnRaceJoinLeaveDocument,
  OnRaceJoinLeaveSubscription,
  SendMessageDocument,
} from "@/graphql/generated/graphql";
import { useMutation, useQuery, useSubscription } from "@apollo/client";

// TODO: right now im fetching the entire chatbox inside `Racebox`
// TODO: think whether it might be better to just pass the ID here and then fetch it from inside of here (makes me think of relay)
interface Props {
  chatboxData: OnRaceJoinLeaveSubscription["onRaceJoinLeave"]["chatbox"];
  meData: MeQuery; // TODO: probably stupid? idk maybe not LOL idk maybe
}

export const Chatbox: FC<Props> = ({ chatboxData: data, meData }) => {
  const [value, setValue] = useState("");
  const [sendMessage, { data: sdfa }] = useMutation(SendMessageDocument);
  const {
    data: chatboxData,
    loading,
    error,
  } = useSubscription(OnChatboxEventDocument, {
    variables: {
      chatboxId: data.id,
    },
  });
  return (
    <div className={styles.chatbox}>
      {chatboxData?.onChatboxEvent.messages
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        .map((message) => (
          <div>
            {message.author.username}: {message.content}
          </div>
        ))}
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button
        onClick={async () => {
          await sendMessage({
            variables: {
              input: {
                content: value,
                userId: meData.me!.id,
                chatboxId: data.id,
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
