"use client";

import { FormEvent, useState } from "react";
import { useMutation } from "@apollo/client";
import { LoginDocument, MeDocument, MeQuery } from "@/graphql/generated/graphql";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login] = useMutation(LoginDocument);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await login({
      variables: { input: { username, password } },
      update: (store, { data }) => {
        if (!data) {
          return null;
        }

        // cache update doesnt work for whatever reason lol
        store.writeQuery<MeQuery>({
          query: MeDocument,
          data: {
            __typename: "Query",
            me: data.login.user,
          },
        });
      },
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h3>login</h3>
        <input type={"text"} placeholder={"username"} value={username} onChange={(e) => setUsername(e.target.value)} />
        <input
          type={"password"}
          placeholder={"password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type={"submit"}>login</button>
      </form>
    </>
  );
}
