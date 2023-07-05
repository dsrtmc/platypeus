import Link from "next/link";
import { LogoutButton } from "@/components/LogoutButton";
import { getClient } from "@/lib/client";
import { MeDocument } from "@/graphql/generated/graphql";
import { cookies } from "next/headers";

export default async function Navbar() {
  const { data, loading, error } = await getClient().query({ query: MeDocument });
  return (
    <nav style={{ display: "flex", gap: "10px" }}>
      <Link href={"/"}>home</Link>
      <Link href={"/register"}>register</Link>
      <Link href={"/login"}>login</Link>
      <Link href={"/bye"}>bye</Link>
      <h3>current user: {data?.me?.username}</h3>
      {!loading && data?.me && <LogoutButton />}
    </nav>
  );
}
