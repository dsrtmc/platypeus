"use client";

import { FormEvent, useState } from "react";
import { useMutation } from "@apollo/client";
import { RegisterDocument } from "@/graphql/generated/graphql";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [register] = useMutation(RegisterDocument);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await register({ variables: { username, email, password } });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>register</h3>
      <input type={"text"} placeholder={"username"} value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type={"email"} placeholder={"email"} value={email} onChange={(e) => setEmail(e.target.value)} />
      <input
        type={"password"}
        placeholder={"password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type={"submit"}>register</button>
    </form>
  );
}
