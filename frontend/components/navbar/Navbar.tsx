import Link from "next/link";
import { MeDocument } from "@/graphql/generated/graphql";
import styles from "./Navbar.module.css";
import { BsBarChartFill, BsInfoLg, BsKeyboardFill } from "react-icons/bs";
import { AuthBox } from "@/components/navbar/AuthBox";
import { getClient } from "@/lib/client";

/*
 * Next.js 13 is really funny and I can't seem to figure out a way to get `AuthBox` to work as expected as a client component.
 * Instead, the solution I've gone with, is we fetch the user on the server on the initial render (RSC + client components instructions),
 * and only initially send it to `AuthBox`. Then, on subsequent renders, the data fetching is done on the client as it should be.
 */
export default async function Navbar() {
  const response = await getClient().query({ query: MeDocument });
  // TODO: make styling better
  return (
    <nav className={styles.navbar}>
      <div className={styles.box}>
        <Link href={"/"} className={styles.item}>
          platypeus
        </Link>
        <Link href={"/"} className={styles.item}>
          <BsKeyboardFill />
        </Link>
        <Link href={"/leaderboards"} className={styles.item}>
          <BsBarChartFill />
        </Link>
        <Link href={"/about"} className={styles.item}>
          <BsInfoLg />
        </Link>
        <Link href={"/bye"} className={styles.item}>
          Bye
        </Link>
      </div>
      <div className={styles.spacer} />
      <AuthBox initial={response.data.me} />
    </nav>
  );
}
