"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LoginDocument, MeDocument, MeQuery } from "@/graphql/generated/graphql";
import { getAccessToken, setAccessToken } from "@/accessToken";

export default function LoginForm() {
  const [username, setUsername] = useState("");

  const [login] = useMutation(LoginDocument);

  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const response = await login({
            variables: { username },
            update: (store, { data }) => {
              if (!data) {
                return null;
              }

              store.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  __typename: "Query",
                  me: data.login.user,
                },
              });
            },
          });
          if (response?.data) {
            setAccessToken(response.data.login.accessToken);
          }
        }}
      >
        <h3>login</h3>
        <input type={"text"} placeholder={"username"} value={username} onChange={(e) => setUsername(e.target.value)} />
        <button type={"submit"}>login</button>
        <button type="button" onClick={() => console.log(getAccessToken())}>
          log access token
        </button>
      </form>
    </>
  );
}
