"use client";

import { useMutation } from "@apollo/client";
import { LoginDocument } from "@/graphql/generated/graphql";
import { Field, Form, Formik } from "formik";
import styles from "./Login.module.css";

export default function LoginForm() {
  const [login] = useMutation(LoginDocument);

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={async ({ username, password }) => {
        await login({
          variables: { input: { username, password } },
          update: (store, { data }) => {
            if (!data) {
              return null;
            }

            // cache update doesnt work for whatever reason lol
            // rly not sure why that's throwing squiggly lines using Formik?
            // store.writeQuery<MeQuery>({
            //   query: MeDocument,
            //   data: {
            //     __typename: "Query",
            //     me: data.login.user,
            //   },
            // });
          },
        });
      }}
    >
      {() => (
        <Form className={styles.form}>
          <Field type="text" name="username" placeholder="username" className={styles.field} />
          <Field type="password" name="password" placeholder="password" className={styles.field} />
          <button type="submit" disabled={false} className={styles.button}>
            login
          </button>
        </Form>
      )}
    </Formik>
  );
}
