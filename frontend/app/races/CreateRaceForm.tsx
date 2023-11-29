"use client";

import React from "react";
import { FieldName, FieldPath, SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { CreateRaceDocument } from "@/graphql/generated/graphql";
import { useRouter } from "next/navigation";
import styles from "./Races.module.css";
import { BiLogIn } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";

interface Props {}

type FormValues = {
  private: boolean;
  password?: string;
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
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data, event) => {
    event?.preventDefault();
    const response = await createRace({
      variables: {
        input: {
          isPrivate: false,
        },
      },
    });
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
      {errors.password && <span className={styles.error}>{errors.password.message}</span>}
      <button type={"submit"} disabled={!!errors.password} className={styles.submitButton}>
        <FaPlus /> Create
      </button>
    </form>
  );
};
