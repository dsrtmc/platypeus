"use client";

import React, { FC, KeyboardEvent, useContext, useRef } from "react";
import styles from "./Race.module.css";
import {
  Chatbox_OnChatboxEventDocument,
  Chatbox_SendMessageDocument,
  RaceBox_OnRaceEventSubscription,
  UserInfoFragment,
} from "@/graphql/generated/graphql";
import { gql, useMutation, useSubscription } from "@apollo/client";
import { FieldPath, SubmitHandler, useForm } from "react-hook-form";
import { IoSend } from "react-icons/io5";
import { Message } from "@/app/races/[slug]/Message";
import TextareaAutosize from "react-textarea-autosize";
import { ChatboxFallback } from "@/app/races/[slug]/ChatboxFallback";
import { ErrorContext } from "@/app/ErrorProvider";

const OnChatboxEvent = gql`
  subscription Chatbox_OnChatboxEvent($chatboxId: UUID!, $messagesLast: Int) {
    onChatboxEvent(chatboxId: $chatboxId) {
      messages(last: $messagesLast) {
        edges {
          node {
            id
            author {
              username
            }
            content
            createdAt
          }
        }
      }
    }
  }
`;

const SendMessage = gql`
  mutation Chatbox_SendMessage($input: SendMessageInput!) {
    sendMessage(input: $input) {
      message {
        content
        chatbox {
          id
        }
      }
      errors {
        code: __typename
        ... on Error {
          message
        }
      }
    }
  }
`;

interface Props {
  chatboxId: RaceBox_OnRaceEventSubscription["onRaceEvent"]["chatboxId"];
  me?: UserInfoFragment | null;
}

const maxMessageLength = 200;

type FormValues = {
  content: string;
};

export const Chatbox: FC<Props> = ({ chatboxId, me }) => {
  const { setError } = useContext(ErrorContext)!;

  const { data, loading, error } = useSubscription(Chatbox_OnChatboxEventDocument, {
    variables: {
      chatboxId,
      messagesLast: 50,
    },
  });

  const [sendMessage, _] = useMutation(Chatbox_SendMessageDocument);

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

  const { ref, ...rest } = register("content" as FieldPath<FormValues>, {
    required: true,
    maxLength: { value: maxMessageLength, message: "You've hit the 200 character count limit." },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data, event) => {
    event?.preventDefault();
    console.log("Data:", data);
    const trimmedContent = data.content.trim();
    const response = await sendMessage({
      variables: {
        input: {
          content: trimmedContent,
          chatboxId,
        },
      },
    });
    const firstError = response.data?.sendMessage.errors?.[0];
      if (firstError) {
        setError({
          code: firstError.code,
          message: firstError.message,
        });
        console.error("Errors:", response.data?.sendMessage.errors);
      }
    if (wrapperRef.current) {
      wrapperRef.current!.scrollTop = wrapperRef.current!.scrollHeight;
    }
    resetField("content" as FieldPath<FormValues>);
  };

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(onSubmit)();
    } else if (e.key === "Escape") {
      if (textareaRef.current) textareaRef.current.blur();
    }
  }

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  if (loading) return <ChatboxFallback />;
  if (!data) return <div className={styles.chatbox}>there was an issue with retrieving the chatbox.</div>;
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.chatbox}>
      <div className={styles.messageListWrapper} ref={wrapperRef}>
        <ul className={styles.messageList}>
          {data?.onChatboxEvent.messages?.edges!.map((edge) => (
            <Message message={edge.node} viewerName={me?.username} key={edge.node.id} />
          ))}
        </ul>
      </div>
      <div className={styles.chatboxBottom}>
        <TextareaAutosize
          maxRows={3}
          placeholder={me ? "message the group" : "log in to use the chatroom"}
          disabled={!me}
          onKeyDown={handleKeyDown}
          ref={(e) => {
            ref(e);
            textareaRef.current = e;
          }}
          {...rest}
          aria-invalid={errors.content ? "true" : "false"}
          spellCheck={false}
          className={styles.textarea}
        />
        <button type={"submit"} className={styles.sendButton} disabled={!me}>
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
