"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client";
import { RegisterDocument } from "@/graphql/generated/graphql";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  // for some reason I get a multiple definition error if I use codegen for hooks
  // e.g. useRegisterMutation(); would cause an error to happen, and I have no idea why
  const [register] = useMutation(RegisterDocument);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const response = await register({ variables: { username, email } });
        console.log(response);
      }}
    >
      <h3>register</h3>
      <input type={"text"} placeholder={"username"} value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type={"email"} placeholder={"email"} value={email} onChange={(e) => setEmail(e.target.value)} />
      <button type={"submit"}>register</button>
    </form>
  );
}
