"use client";

import { gql, useMutation } from "@apollo/client";
import { MeDocument, MeQuery, RegisterForm_RegisterDocument } from "@/graphql/generated/graphql";
import styles from "./Form.module.css";
import { useEffect } from "react";
import Link from "next/link";
import { FieldPath, SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineUserAdd } from "react-icons/ai";

type FormValues = {
  username: string;
  email: string;
  password: string;
};

const RegisterMutation = gql`
  mutation RegisterForm_Register($input: RegisterInput!) {
    register(input: $input) {
      user {
        id
        ...UserInfo
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

export default function RegisterForm() {
  const [registerUser] = useMutation(RegisterForm_RegisterDocument);

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
      update: (cache, { data }) => {
        if (!data) return;
        cache.writeQuery<MeQuery>({
          query: MeDocument,
          data: {
            me: data.register.user,
          },
        });
      },
    });
    console.log("Register response:", response);
  };

  useEffect(() => {
    setFocus("username");
  }, [setFocus]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <span>Sign up</span>
      <input
        type={"text"}
        {...register("username" as FieldPath<FormValues>, { required: "This field is required." })}
        placeholder={"username"}
        aria-invalid={errors.username ? "true" : "false"}
        className={styles.field}
      />
      <input
        type={"email"}
        {...register("email" as FieldPath<FormValues>, { required: "This field is required." })}
        placeholder={"email"}
        aria-invalid={errors.email ? "true" : "false"}
        className={styles.field}
      />
      <input
        type={"password"}
        {...register("password" as FieldPath<FormValues>, { required: "This field is required." })}
        placeholder={"password"}
        aria-invalid={errors.password ? "true" : "false"}
        className={styles.field}
      />
      <button type="submit" className={styles.button}>
        <AiOutlineUserAdd /> register
      </button>
      <Link href={"/login"} className={styles.instead}>
        Sign in instead
      </Link>
    </form>
  );
}
