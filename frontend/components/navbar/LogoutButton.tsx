"use client";

import { useMutation } from "@apollo/client";
import { LogoutDocument } from "@/graphql/generated/graphql";
import { BiLogOut } from "react-icons/bi";
import styles from "./Navbar.module.css";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const [logout, { client }] = useMutation(LogoutDocument);
  const router = useRouter();
  async function handleLogout() {
    await logout();
    router.push("/login");
    try {
      await client.resetStore();
    } catch (err) {
      console.error("Error:", err);
    }
  }
  return (
    <button onClick={handleLogout} className={`${styles.logout} ${styles.icon}`}>
      <BiLogOut />
    </button>
  );
}
