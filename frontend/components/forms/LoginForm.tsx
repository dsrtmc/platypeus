"use client";

import { useMutation } from "@apollo/client";
import { LoginDocument, MeDocument, MeQuery } from "@/graphql/generated/graphql";
import styles from "./Form.module.css";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { FieldPath, SubmitHandler, useForm } from "react-hook-form";
import { BiLogIn } from "react-icons/bi";

type FormValues = {
  username: string;
  password: string;
};

export default function LoginForm() {
  const [login] = useMutation(LoginDocument);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<FormValues>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // TODO: Figure out why response doesn't have error messages
  const onSubmit: SubmitHandler<FormValues> = async (data, event) => {
    event?.preventDefault();
    const response = await login({
      variables: { input: { username: data.username, password: data.password } },
      update: (cache, { data }) => {
        if (!data) {
          return null;
        }
        cache.writeQuery<MeQuery>({
          query: MeDocument,
          data: {
            me: data.login.user,
          },
        });
      },
    });
    console.log("Response:", response);
    // TODO: redirect home
  };

  useEffect(() => {
    setFocus("username");
  }, [setFocus]);

  // Ignore squiggly lines, explicit type declaration fixes it despite being the same type; `react-hook-form` doing the funny
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <input
        type={"text"}
        {...register("username" as FieldPath<FormValues>, { required: "This field is required." })}
        placeholder={"username"}
        aria-invalid={errors.username ? "true" : "false"}
        className={styles.field}
      />
      <input
        type={"password"}
        {...register("password" as FieldPath<FormValues>, { required: "This field is required." })}
        placeholder={"password"}
        aria-invalid={errors.password ? "true" : "false"}
        className={styles.field}
      />
      {errors.password && <span className={styles.error}>{errors.password.message}</span>}
      <button type={"submit"} disabled={!!errors.password || !!errors.username} className={styles.button}>
        <BiLogIn /> login
      </button>
      <Link href={"/register"} className={styles.instead}>
        Sign up instead
      </Link>
    </form>
  );
}
