"use client";

import { useMutation } from "@apollo/client";
import { LogoutDocument } from "@/graphql/generated/graphql";

export function LogoutButton() {
  const [logout, { client }] = useMutation(LogoutDocument);
  async function handleLogout() {
    await logout();
    try {
      await client.resetStore(); // for some reason it errors out and doesn't work
    } catch (err) {
      console.log("error:", err);
    }
  }
  return <button onClick={handleLogout}>logout</button>;
}
