"use client";

import React from "react";
import { Field, FieldName, FieldPath, SubmitHandler, useForm, UseFormWatch } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { CreateRaceDocument } from "@/graphql/generated/graphql";
import { useRouter } from "next/navigation";
import styles from "./Races.module.css";
import { BiLogIn } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";
import { generateRandomWords } from "@/utils/generateRandomWords";
import { LOADED_WORDS_COUNT } from "@/shared/constants/testConfig";

interface Props {}

type FormValues = {
  private: boolean;
  password?: string;
  mode: "time" | "words";
  modeSetting: string;
};

export const CreateRaceForm: React.FC<Props> = ({}) => {
  const [createRace, { data }] = useMutation(CreateRaceDocument);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    watch,
  } = useForm<FormValues>({
    defaultValues: {
      private: false,
      mode: "time",
      modeSetting: "5",
      password: "",
    },
  });

  // TODO: move it somewhere else?
  function generateContent(mode: "time" | "words", modeSetting: number): string {
    switch (mode) {
      case "time":
        return generateRandomWords(6 * modeSetting).join(" ");
      case "words":
        return generateRandomWords(modeSetting).join(" ");
    }
  }

  const onSubmit: SubmitHandler<FormValues> = async (data, event) => {
    event?.preventDefault();
    const response = await createRace({
      variables: {
        input: {
          isPrivate: false,
          mode: data.mode,
          modeSetting: parseInt(data.modeSetting),
          // TODO: is that a good idea to just use a string? :/
          // the issue is that we have to de-stringify it later anyways, but idk another way to carry it over
          content: generateContent(data.mode, parseInt(data.modeSetting)),
        },
      },
    });
    console.log("mode setting:", data.modeSetting);
    console.log("The response we got:", response);
    router.push(`/races/${response.data?.createRace.race?.id}`);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h1>Create a race</h1>
      <label>private?</label>
      <input {...register("private" as FieldPath<FormValues>)} type={"checkbox"} />
      <input
        {...register("password" as FieldPath<FormValues>, {
          disabled: !watch("private"),
          required: { value: watch("private"), message: "When set to private, a password is required." },
        })}
        type={"password"}
        placeholder={"password"}
        aria-invalid={errors.password ? "true" : "false"}
        className={styles.field}
      />
      <div style={{ display: "flex", gap: "1rem" }}>
        <input {...register("mode" as FieldPath<FormValues>)} type={"radio"} value={"time"} />
        <label htmlFor={"time"}>time</label>
        <input {...register("mode" as FieldPath<FormValues>)} type={"radio"} value={"words"} />
        <label htmlFor={"words"}>words</label>
        <div>selected mode: {watch("mode")}</div>
      </div>
      <div>
        {watch("mode") === "time" ? (
          // TODO: that's probably not how I should be using `htmlFor` lol
          // time
          <>
            <input {...register("modeSetting" as FieldPath<FormValues>)} type={"radio"} value={"5"} />
            <label htmlFor={"5"}>5</label>
            <input {...register("modeSetting" as FieldPath<FormValues>)} type={"radio"} value={"15"} />
            <label htmlFor={"15"}>15</label>
            <input {...register("modeSetting" as FieldPath<FormValues>)} type={"radio"} value={"60"} />
            <label htmlFor={"60"}>60</label>
          </>
        ) : (
          // TODO: Even though when selecting "word" and "25" being selected, it is not actually registered
          // ^^^^^ and it stays at 5. FIX THIS FIX THIS VERY IMPORTANT!
          // words
          <>
            <input {...register("modeSetting" as FieldPath<FormValues>)} type={"radio"} value={"25"} />
            <label htmlFor={"25"}>25</label>
            <input {...register("modeSetting" as FieldPath<FormValues>)} type={"radio"} value={"50"} />
            <label htmlFor={"50"}>50</label>
          </>
        )}
      </div>
      {errors.password && <span className={styles.error}>{errors.password.message}</span>}
      <button type={"submit"} disabled={!!errors.password} className={styles.submitButton}>
        <FaPlus /> Create
      </button>
    </form>
  );
};
