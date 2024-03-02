"use client";

import React, { FC, KeyboardEvent, useRef } from "react";
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
import { Message } from "@/app/races/[slug]/Message";
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
      messagesLast: 50,
    },
  });

  const [sendMessage, _] = useMutation(SendMessageDocument);

  const wrapperRef = useRef<HTMLDivElement | null>(null);

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
          chatboxId,
        },
      },
    });
    if (wrapperRef.current) {
      wrapperRef.current!.scrollTop = wrapperRef.current!.scrollHeight;
    }
    resetField("content" as FieldPath<FormValues>);
  };

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  }

  // TODO: look up all `if (!data)` or `if (loading)` and make them look nicer
  if (!data) return <div>no data yet</div>;
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.chatbox}>
      <div className={styles.messageListWrapper} ref={wrapperRef}>
        <ul className={styles.messageList}>
          {data?.onChatboxEvent.messages?.edges!.map((edge) => (
            // TODO: colors xd
            <Message message={edge.node} viewerName={meData.me?.username} key={edge.node.id} />
          ))}
        </ul>
      </div>
      <div className={styles.bottom}>
        {/* TODO: `.blur()` on Escape click, however if I pass a ref here some funny stuff happens and it crashes */}
        {/* TODO: for some reason we have spell check LOL? */}
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
