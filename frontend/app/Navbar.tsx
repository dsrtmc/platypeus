"use client";

import Link from "next/link";
import { MeDocument } from "@/graphql/generated/graphql";
import { useEffect } from "react";
import { setAccessToken } from "@/accessToken";
import { useQuery } from "@apollo/client";

export default function Navbar() {
  const { data, loading, error } = useQuery(MeDocument);
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
    </>
  );
}
