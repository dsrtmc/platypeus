"use client";

import { FormEvent, useState } from "react";
import { useMutation } from "@apollo/client";
import { RegisterDocument } from "@/graphql/generated/graphql";
import { Field, Form, Formik } from "formik";

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
        <Form>
          <Field type="text" name="username" placeholder="username" />
          <Field type="email" name="email" placeholder="email" />
          <Field type="password" name="password" placeholder="password" />
          <button type="submit" disabled={false}>
            register
          </button>
        </Form>
      )}
    </Formik>
  );
}
