"use client";

import { FormEvent } from "react";
import { useMutation } from "@apollo/client";
import { LoginDocument, MeDocument, MeQuery } from "@/graphql/generated/graphql";
import { Field, Form, Formik } from "formik";

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
        <Form>
          <Field type="text" name="username" placeholder="username" />
          <Field type="password" name="password" placeholder="password" />
          <button type="submit" disabled={false}>
            login
          </button>
        </Form>
      )}
    </Formik>
  );
}
