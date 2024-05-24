"use client";

import { gql, useMutation } from "@apollo/client";
import { Login_MeDocument, Login_MeQuery, LoginForm_LoginDocument } from "@/graphql/generated/graphql";
import styles from "./Form.module.css";
import { useEffect } from "react";
import Link from "next/link";
import { FieldPath, SubmitHandler, useForm } from "react-hook-form";
import { LoginButton } from "@/components/forms/LoginButton";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setFocus,
    setError,
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
        // TODO: erm it actually doesn't work because if we navigate somewhere else that requires auth, it doesn't update it
        // my guess is it's because our `MeDocument` is not global and Apollo separates them
        cache.writeQuery<Login_MeQuery>({
          query: Login_MeDocument,
          data: {
            me: data.login.user,
          },
        });
      },
    });
    if (response.data?.login.user) {
      router.push("/");
    } else if (response.data?.login.errors) {
      // I guess we shouldn't set the error on the `password` field. Too bad!
      setError("password", { type: "custom", message: response.data.login.errors[0].message });
    }
  };

  useEffect(() => {
    setFocus("username");
  }, [setFocus]);

  // Ignore squiggly lines, explicit type declaration fixes it despite being the same type; `react-hook-form` doing the funny
  // TODO: i don't rly like that it suggests ur previous passwords - disable it and read on accessibility whether it fucks it up
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
