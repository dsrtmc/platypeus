"use client";

import { gql, useMutation } from "@apollo/client";
import {
  Login_MeDocument,
  Login_MeQuery,
  LoginForm_LoginDocument,
  MeDocument,
  MeQuery,
} from "@/graphql/generated/graphql";
import styles from "./Form.module.css";
import { useContext, useEffect } from "react";
import Link from "next/link";
import { FieldPath, SubmitHandler, useForm } from "react-hook-form";
import { LoginButton } from "@/components/forms/LoginButton";
import { useRouter } from "next/navigation";
import { ErrorContext } from "@/app/ErrorProvider";

type FormValues = {
  username: string;
  password: string;
};

const LoginMutation = gql`
  mutation LoginForm_Login($input: LoginInput!) {
    login(input: $input) {
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

export default function LoginForm() {
  const [login] = useMutation(LoginForm_LoginDocument);
  const { setError } = useContext(ErrorContext)!;

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setFocus,
  } = useForm<FormValues>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data, event) => {
    event?.preventDefault();
    const response = await login({
      variables: { input: { username: data.username, password: data.password } },
      update: (cache, { data }) => {
        if (!data) return;
        cache.writeQuery<MeQuery>({
          query: MeDocument,
          data: {
            me: data.login.user,
          },
        });
      },
    });
    const firstError = response.data?.login.errors?.[0];
    if (firstError) {
      setError({
        code: firstError.code,
        message: firstError.message,
      });
      console.error("Errors:", response.data?.login.errors);
      return;
    }
    router.push("/");
  };

  useEffect(() => {
    setFocus("username");
  }, [setFocus]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <span>Sign in</span>
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
      <LoginButton disabled={!!errors.password || !!errors.username || isSubmitting} isSubmitting={isSubmitting} />
      <Link href={"/register"} className={styles.instead}>
        Sign up instead
      </Link>
    </form>
  );
}
