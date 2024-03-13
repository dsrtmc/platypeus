"use client";

import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { CreateRaceForm_CreateRaceDocument } from "@/graphql/generated/graphql";
import { useRouter } from "next/navigation";
import styles from "./Races.module.css";
import { FaPlus } from "react-icons/fa";
import { generateRandomWords } from "@/utils/generateRandomWords";
import { WORD_LISTS } from "@/utils/wordLists";

interface Props {}

type FormValues = {
  unlisted: boolean;
  mode: "time" | "words";
  modeSetting: string;
};

const CreateRace = gql`
  mutation CreateRaceForm_CreateRace($input: CreateRaceInput!) {
    createRace(input: $input) {
      race {
        id
        unlisted
        slug
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

export const CreateRaceForm: React.FC<Props> = ({}) => {
  const [createRace, { data }] = useMutation(CreateRaceForm_CreateRaceDocument);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormValues>({
    defaultValues: {
      unlisted: false,
      mode: "time",
      modeSetting: "5",
    },
  });

  function generateContent(mode: "time" | "words", modeSetting: number): string {
    const count = mode === "time" ? 7 * modeSetting : modeSetting;
    return generateRandomWords(WORD_LISTS["english"], count).join(" ");
  }

  const onSubmit: SubmitHandler<FormValues> = async (data, event) => {
    event?.preventDefault();
    const response = await createRace({
      variables: {
        input: {
          unlisted: data.unlisted,
          mode: data.mode,
          modeSetting: parseInt(data.modeSetting),
          content: generateContent(data.mode, parseInt(data.modeSetting)),
        },
      },
    });
    console.log("mode setting:", data.modeSetting);
    console.log("The response we got:", response);
    if (!response.data?.createRace.race) return;
    router.push(`/races/${response.data?.createRace.race?.slug}`);
  };

  /*
   * TODO: apparently you're not supposed to use `watch()` inside of the useEffect()'s dependency array,
   * but the docs only mention optimization, and this is not an issue here at all.
   * also, its only purpose is to avoid discrepancy between the "selected" setting (UI) and the actually selected one.
   */
  useEffect(() => {
    setValue("modeSetting", "5");
  }, [watch("mode")]);

  // TODO: require authentication
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h1 className={styles.header}>create a race</h1>
      <label className={styles.label}>
        unlisted?
        <input {...register("unlisted")} type={"checkbox"} className={styles.checkbox} />
      </label>
      <section className={styles.horizontalGroup}>
        <div className={styles.label}>mode:</div>
        <div className={styles.spacer} />
        <label className={styles.label}>
          <input {...register("mode")} type={"radio"} value={"time"} className={styles.radio} />
          time
        </label>
        <label htmlFor={"words"} className={styles.label}>
          <input {...register("mode")} type={"radio"} value={"words"} className={styles.radio} />
          words
        </label>
      </section>
      <section className={styles.horizontalGroup}>
        <div className={styles.label}>setting:</div>
        <div className={styles.spacer} />
        {watch("mode") === "time" ? (
          <>
            <label className={styles.label}>
              <input {...register("modeSetting")} type={"radio"} value={"5"} />5
            </label>
            <label className={styles.label}>
              <input {...register("modeSetting")} type={"radio"} value={"15"} />
              15
            </label>
            <label className={styles.label}>
              <input {...register("modeSetting")} type={"radio"} value={"30"} />
              30
            </label>
            <label className={styles.label}>
              <input {...register("modeSetting")} type={"radio"} value={"60"} />
              60
            </label>
          </>
        ) : (
          <>
            <label className={styles.label}>
              <div className={styles.radioWrapper}>
                <input {...register("modeSetting")} type={"radio"} value={"5"} />5
              </div>
            </label>
            <label className={styles.label}>
              <input {...register("modeSetting")} type={"radio"} value={"25"} />
              25
            </label>
            <label className={styles.label}>
              <input {...register("modeSetting")} type={"radio"} value={"50"} />
              50
            </label>
            <label className={styles.label}>
              <input {...register("modeSetting")} type={"radio"} value={"100"} />
              100
            </label>
          </>
        )}
      </section>
      <button type={"submit"} className={styles.submitButton}>
        <FaPlus /> create
      </button>
    </form>
  );
};
