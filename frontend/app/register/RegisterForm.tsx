"use client";

import { useMutation } from "@apollo/client";
import { RegisterDocument } from "@/graphql/generated/graphql";
import styles from "./Register.module.css";
import { useEffect } from "react";
import Link from "next/link";
import { FieldPath, SubmitHandler, useForm } from "react-hook-form";

type FormValues = {
  username: string;
  email: string;
  password: string;
};

export default function RegisterForm() {
  const [registerUser] = useMutation(RegisterDocument);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setFocus,
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data, event) => {
    event?.preventDefault();
    const response = await registerUser({
      variables: { input: { username: data.username, email: data.email, password: data.password } },
    });
    console.log("Register response:", response);
  };

  useEffect(() => {
    setFocus("username");
  }, [setFocus]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <input
        type={"text"}
        {...register("username" as FieldPath<FormValues>, { required: "This field is required." })}
        aria-invalid={errors.username ? "true" : "false"}
        className={styles.field}
      />
      <input
        type={"email"}
        {...register("email" as FieldPath<FormValues>, { required: "This field is required." })}
        aria-invalid={errors.email ? "true" : "false"}
        className={styles.field}
      />
      <input
        type={"password"}
        {...register("password" as FieldPath<FormValues>, { required: "This field is required." })}
        aria-invalid={errors.password ? "true" : "false"}
        className={styles.field}
      />
      <button type="submit" className={styles.button}>
        register
      </button>
      <Link href={"/login"}>sign in instead</Link>
    </form>
  );
}
