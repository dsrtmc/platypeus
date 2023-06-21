"use client";

import Link from "next/link";
import { LogoutDocument, MeDocument } from "@/graphql/generated/graphql";
import { useEffect } from "react";
import { setAccessToken } from "@/accessToken";
import { useApolloClient, useLazyQuery, useMutation, useQuery } from "@apollo/client";

export default function Navbar() {
  const { data, loading, error } = useQuery(MeDocument);
  const [logout, { client }] = useMutation(LogoutDocument);
  useEffect(() => {
    console.info("first log");
    fetch("http://localhost:5053/refresh-token", { credentials: "include" }).then(async (res) => {
      const data = await res.json();
      setAccessToken(data.accessToken);
    });
  }, []);

  return (
    <>
      <nav style={{ display: "flex", gap: "10px" }}>
        <Link href={"/"}>home</Link>
        <Link href={"/register"}>register</Link>
        <Link href={"/login"}>login</Link>
        <Link href={"/bye"}>bye</Link>
      </nav>
      <h3>current user: {data?.me?.username}</h3>
      {!loading && data?.me && (
        <button
          onClick={async () => {
            await logout();
            setAccessToken("");
            try {
              await client.resetStore(); // for some reason it errors out and doesn't work
            } catch (err) {
              console.log("error:", err);
            }
          }}
        >
          log out
        </button>
      )}
    </>
  );
}
