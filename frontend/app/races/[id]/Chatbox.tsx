"use client";

import React, { FC, KeyboardEvent } from "react";
import styles from "./Race.module.css";
import {
  MeQuery,
  OnChatboxEventDocument,
  OnRaceEventSubscription,
  SendMessageDocument,
} from "@/graphql/generated/graphql";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { FieldPath, SubmitHandler, useForm } from "react-hook-form";
import { IoSend } from "react-icons/io5";
import { Message } from "@/app/races/[id]/Message";
import TextareaAutosize from "react-textarea-autosize";

interface Props {
  chatboxId: OnRaceEventSubscription["onRaceEvent"]["chatboxId"];
  meData: MeQuery; // TODO: probably stupid? idk maybe not LOL idk maybe
}

const maxMessageLength = 200;

type FormValues = {
  content: string;
};

export const Chatbox: FC<Props> = ({ chatboxId, meData }) => {
  const { data, loading, error } = useSubscription(OnChatboxEventDocument, {
    variables: {
      chatboxId,
    },
  });

  // TODO: Not sure whether there's a better way to do that with react-hook-form,
  // but as of right now, using `role="textbox"` is an issue.
  const [sendMessage, _] = useMutation(SendMessageDocument);

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
    watch,
  } = useForm<FormValues>({
    defaultValues: {
      content: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data, event) => {
    event?.preventDefault();
    console.log("Data:", data);
    await sendMessage({
      variables: {
        input: {
          content: data.content,
          userId: meData.me!.id,
          chatboxId,
        },
      },
    });
    resetField("content" as FieldPath<FormValues>);
  };

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.chatbox}>
      <div className={styles.messageListWrapper}>
        <ul className={styles.messageList}>
          {data?.onChatboxEvent.messages.map((message) => (
            // TODO: colors xd
            <Message message={message} viewerName={meData.me?.username} key={message.id} />
          ))}
        </ul>
      </div>
      <div className={styles.bottom}>
        <TextareaAutosize
          maxRows={3}
          placeholder={meData.me ? "Message the group" : "Log in to use the chatroom"}
          disabled={!meData.me}
          onKeyDown={handleKeyDown}
          {...register("content" as FieldPath<FormValues>, {
            required: true,
            maxLength: { value: maxMessageLength, message: "You've hit the 200 character count limit." },
          })}
          aria-invalid={errors.content ? "true" : "false"}
          className={styles.textarea}
        />
        <button type={"submit"} className={styles.sendButton} disabled={!meData.me}>
          <IoSend />
        </button>
      </div>
      {(watch("content") as string).length >= maxMessageLength - 50 && (
        <span className={styles.error}>
          {maxMessageLength - (watch("content") as string).length} characters remaining
        </span>
      )}
      {errors.content && <span className={styles.error}>{errors.content.message}</span>}
    </form>
  );
};
