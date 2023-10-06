"use client";

import { useMutation } from "@apollo/client";
import { LoginDocument, MeDocument, MeQuery } from "@/graphql/generated/graphql";
import { Field, Form, Formik } from "formik";
import styles from "./Login.module.css";
import { useEffect, useRef } from "react";
import Link from "next/link";

export default function LoginForm() {
  const [login] = useMutation(LoginDocument);
  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (ref && ref.current) ref.current!.focus();
  }, []);

  return (
    <Formik
      // IGNORE THIS SQUIGGLY LINE IT MAKES NO SENSE
      // ???????????????????????????????????????????
      initialValues={{ username: "", password: "" }}
      onSubmit={async ({ username, password }) => {
        await login({
          variables: { input: { username, password } },
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
      }}
    >
      {() => (
        <Form className={styles.form}>
          <Field type="text" name="username" placeholder="username" className={styles.field} innerRef={ref} />
          <Field type="password" name="password" placeholder="password" className={styles.field} />
          <button type="submit" disabled={false} className={styles.button}>
            login
          </button>
          <Link href={"/register"}>sign up instead</Link>
        </Form>
      )}
    </Formik>
  );
}
