import Link from "next/link";
import { MeDocument } from "@/graphql/generated/graphql";
import styles from "./Navbar.module.css";
import { BsBarChartFill, BsInfoLg, BsKeyboardFill } from "react-icons/bs";
import { AuthBox } from "@/components/navbar/AuthBox";
import { getClient } from "@/lib/client";
import { NavLink } from "@/components/navbar/NavLink";
import { FieldValues } from "react-hook-form";
import { FaCarSide, FaCog, FaInfo } from "react-icons/fa";
import { FaChartSimple, FaKeyboard } from "react-icons/fa6";
import { IoInformation } from "react-icons/io5";

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
        <NavLink href={"/"} Icon={FaKeyboard} iconSize={"1.15rem"} />
        <NavLink href={"/leaderboards"} Icon={FaChartSimple} iconSize={"1.15rem"} />
        <NavLink href={"/about"} Icon={FaInfo} iconSize={"1.05rem"} />
        <NavLink href={"/bye"} Icon={BsKeyboardFill} iconSize={"1.15rem"} />
        <NavLink href={"/races"} Icon={FaCarSide} iconSize={"1.15rem"} />
        <NavLink href={"/settings"} Icon={FaCog} iconSize={"1.15rem"} />
      </div>
      <AuthBox initial={response.data.me} />
    </nav>
  );
}
