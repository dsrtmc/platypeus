import { Navbar_MeDocument } from "@/graphql/generated/graphql";
import styles from "./Navbar.module.css";
import { AuthBox } from "@/components/navbar/AuthBox";
import { getClient } from "@/lib/client";
import { NavLink } from "@/components/navbar/NavLink";
import { FaCog, FaInfo } from "react-icons/fa";
import { FaChartSimple, FaKeyboard } from "react-icons/fa6";
import { LuSwords } from "react-icons/lu";
import { gql } from "@apollo/client";

/*
 * Next.js 13 is really funny and I can't seem to figure out a way to get `AuthBox` to work as expected as a client component.
 * Instead, the solution I've gone with, is we fetch the user on the server on the initial render (RSC + client components instructions),
 * and only then send it to `AuthBox`. Then, on subsequent renders, the data fetching is done on the client as it should be.
 */

const Me = gql`
  query Navbar_Me {
    me {
      id
      ...UserInfoFragment
    }
  }
`;

export default async function Navbar() {
  const { data } = await getClient().query({ query: Navbar_MeDocument });
  return (
    <nav className={styles.navbar}>
      <div className={styles.box}>
        <NavLink href={"/"} Icon={FaKeyboard} iconSize={"1.15rem"} />
        <NavLink href={"/leaderboards"} Icon={FaChartSimple} iconSize={"1.15rem"} />
        <NavLink href={"/about"} Icon={FaInfo} iconSize={"1.05rem"} />
        <NavLink href={"/races"} Icon={LuSwords} iconSize={"1.15rem"} />
        <NavLink href={"/settings"} Icon={FaCog} iconSize={"1.15rem"} />
      </div>
      <div className={styles.box}>
        <AuthBox initial={data.me} />
      </div>
    </nav>
  );
}
