"use client";

import Link from "next/link";
import { LogoutDocument, MeDocument } from "@/graphql/generated/graphql";
import { useEffect, useState } from "react";
import { setAccessToken } from "@/accessToken";
import { useMutation, useQuery } from "@apollo/client";

export default function Navbar() {
  const { data, loading, error } = useQuery(MeDocument);

  const [logout, { client }] = useMutation(LogoutDocument);

  useEffect(() => {
    fetch("http://localhost:5053/refresh-token", { credentials: "include" }).then(async (res) => {
      const data = await res.json();
      setAccessToken(data.accessToken);
    });
  }, []);

  async function handleLogout() {
    await logout();
    setAccessToken("");
    try {
      await client.resetStore(); // for some reason it errors out and doesn't work
    } catch (err) {
      console.log("error:", err);
    }
  }

  return (
    <>
      <nav style={{ display: "flex", gap: "10px" }}>
        <Link href={"/"}>home</Link>
        <Link href={"/register"}>register</Link>
        <Link href={"/login"}>login</Link>
        <Link href={"/bye"}>bye</Link>
        <h3>current user: {data?.me?.username}</h3>
        {!loading && data?.me && <button onClick={handleLogout}>log out</button>}
      </nav>
    </>
  );
}
