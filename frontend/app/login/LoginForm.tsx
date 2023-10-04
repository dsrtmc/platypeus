"use client";

import { useMutation } from "@apollo/client";
import { LoginDocument, MeDocument, MeQuery } from "@/graphql/generated/graphql";
import { Field, Form, Formik } from "formik";
import styles from "./Login.module.css";

export default function LoginForm() {
  const [login] = useMutation(LoginDocument);

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
          <Field type="text" name="username" placeholder="username" className={styles.field} />
          <Field type="password" name="password" placeholder="password" className={styles.field} />
          <button type="submit" disabled={false} className={styles.button}>
            login
          </button>
        </Form>
      )}
    </Formik>
    // <form
    //   onSubmit={async (e) => {
    //     e.preventDefault();
    //     await login({
    //       variables: { input: { username, password } },
    //       update: (cache, { data }) => {
    //         if (!data) {
    //           return null;
    //         }
    //         cache.writeQuery<MeQuery>({
    //           query: MeDocument,
    //           data: {
    //             me: data.login.user,
    //           },
    //         });
    //       },
    //     });
    //   }}
    // >
    //   <input value={username} onChange={(e) => setUsername(e.target.value)} />
    //   <input value={password} onChange={(e) => setPassword(e.target.value)} />
    //   <button>submit</button>
    // </form>
  );
}
