"use client";

import { useMutation } from "@apollo/client";
import { LoginDocument, MeDocument, MeQuery } from "@/graphql/generated/graphql";
import { Field, Form, Formik } from "formik";
import styles from "./Login.module.css";
import { useState } from "react";

export default function LoginForm() {
  const [login] = useMutation(LoginDocument);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    // <Formik
    //   initialValues={{ username: "", password: "" }}
    //   onSubmit={async ({ username, password }) => {
    //     await login({
    //       variables: { input: { username, password } },
    //       update: (cache, { data }) => {
    //         if (!data) {
    //           return null;
    //         }
    //
    //         // cache update doesnt work for whatever reason lol
    //         // rly not sure why that's throwing squiggly lines using Formik?
    //         // cache.writeQuery<MeQuery>({
    //         //   query: MeDocument,
    //         //   data: {
    //         //     __typename: "Query",
    //         //     me: data.login.user,
    //         //   },
    //         // });
    //       },
    //     });
    //   }}
    // >
    //   {() => (
    //     <Form className={styles.form}>
    //       <Field type="text" name="username" placeholder="username" className={styles.field} />
    //       <Field type="password" name="password" placeholder="password" className={styles.field} />
    //       <button type="submit" disabled={false} className={styles.button}>
    //         login
    //       </button>
    //     </Form>
    //   )}
    // </Formik>
    // keep it without formik for now because i want to get this cache updating to work
    // and my preivous comments make me afraid that formik might inhibit my progress here
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const user = await login({
          variables: { input: { username, password } },
          update: (cache, { data }) => {
            if (!data) {
              return null;
            }

            // cache update doesnt work for whatever reason lol
            // rly not sure why that's throwing squiggly lines using Formik?
            cache.writeQuery<MeQuery>({
              query: MeDocument,
              data: {
                __typename: "Query",
                me: data.login.user,
              },
            });
          },
        });
        console.log("user:", user);
      }}
    >
      <input value={username} onChange={(e) => setUsername(e.target.value)} />
      <input value={password} onChange={(e) => setPassword(e.target.value)} />
      <button> e.p[re}>submit</button>
    </form>
  );
}
