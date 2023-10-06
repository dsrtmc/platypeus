import Link from "next/link";
import { MeDocument } from "@/graphql/generated/graphql";
import styles from "./Navbar.module.css";
import { BsBarChartFill, BsInfoLg, BsKeyboardFill } from "react-icons/bs";
import { GiPuppet } from "react-icons/gi";
import { AuthBox } from "@/components/navbar/AuthBox";
import { getClient } from "@/lib/client";

/*
 * Next.js 13 is really funny and I can't seem to figure out a way to get `AuthBox` to work as expected as a client component.
 * Instead, the solution I've gone with, is we fetch the user on the server on the initial render (RSC + client components instructions),
 * and only initially send it to `AuthBox`. Then, on subsequent renders, the data fetching is done on the client as it should be.
 * A really smart workaround that I attribute to `user:4345841` on https://stackoverflow.com/.
 */
export default async function Navbar() {
  // oh lol but now the cache update doesnt work XD XDXDXDD
  const response = await getClient().query({ query: MeDocument });
  return (
    <nav className={styles.navbar}>
      <div className={styles.box}>
        <Link href={"/"} className={styles.icon}>
          <GiPuppet />
        </Link>
        <Link href={"/"} className={styles.icon}>
          <BsKeyboardFill />
        </Link>
        <Link href={"/leaderboards"} className={styles.icon}>
          <BsBarChartFill />
        </Link>
        <Link href={"/about"} className={styles.icon}>
          <BsInfoLg />
        </Link>
        <Link href={"/bye"} className={styles.icon}>
          Bye
        </Link>
      </div>
      <div className={styles.spacer}></div>
      {/* TODO: make styling better */}
      <AuthBox initial={response.data.me} />
    </nav>
  );
}
