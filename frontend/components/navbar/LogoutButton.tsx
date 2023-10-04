"use client";

import { useMutation } from "@apollo/client";
import { LogoutDocument } from "@/graphql/generated/graphql";
import { BiLogOut } from "react-icons/bi";
import styles from "./Navbar.module.css";

export function LogoutButton() {
  const [logout, { client }] = useMutation(LogoutDocument);
  async function handleLogout() {
    await logout();
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
