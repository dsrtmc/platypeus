import Link from "next/link";
import { LogoutButton } from "@/components/LogoutButton";
import { getClient } from "@/lib/client";
import { MeDocument } from "@/graphql/generated/graphql";
import styles from "./Navbar.module.css";

export default async function Navbar() {
  const { data, loading, error } = await getClient().query({ query: MeDocument });
  return (
    <nav className={styles.navbar}>
      <div className={styles.box}>
        <Link href={"/"} className={styles.item}>
          Home
        </Link>
        <Link href={"/leaderboards"} className={styles.item}>
          Leaderboards
        </Link>
        <Link href={"/register"} className={styles.item}>
          Register
        </Link>
        <Link href={"/login"} className={styles.item}>
          Login
        </Link>
        <Link href={"/bye"} className={styles.item}>
          Bye
        </Link>
      </div>
      <div className={styles.box} />
      <div className={styles.box}>
        <h3 className={styles.item}>current user: {data?.me?.username}</h3>
        {!loading && data?.me && <LogoutButton />}
      </div>
    </nav>
  );
}
