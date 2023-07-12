"use client";

import { useMutation } from "@apollo/client";
import { RegisterDocument } from "@/graphql/generated/graphql";
import { Field, Form, Formik } from "formik";
import styles from "./Register.module.css";

export default function RegisterForm() {
  const [register] = useMutation(RegisterDocument);

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={async ({ username, email, password }) => {
        await register({ variables: { input: { username, email, password } } });
      }}
    >
      {() => (
        <Form className={styles.form}>
          <Field type="text" name="username" placeholder="username" className={styles.field} />
          <Field type="email" name="email" placeholder="email" className={styles.field} />
          <Field type="password" name="password" placeholder="password" className={styles.field} />
          <button type="submit" disabled={false} className={styles.button}>
            register
          </button>
        </Form>
      )}
    </Formik>
  );
}
