"use client";

import styles from "@/components/navbar/Navbar.module.css";
import React, { useEffect, useState } from "react";
import { useMutation, useSuspenseQuery } from "@apollo/client";
import { LogoutDocument, MeDocument, MeQuery } from "@/graphql/generated/graphql";
import { BiLogIn, BiLogOut, BiSolidUser } from "react-icons/bi";
import { NavLink } from "@/components/navbar/NavLink";
import { NavButton } from "@/components/navbar/NavButton";
import { useRouter } from "next/navigation";

interface Props {
  initial: MeQuery["me"];
}

export const AuthBox: React.FC<Props> = ({ initial }) => {
  const { data } = useSuspenseQuery(MeDocument);
  const [user, setUser] = useState(data?.me ? data.me : initial);
  const [logout, { client }] = useMutation(LogoutDocument);
  const router = useRouter();

  useEffect(() => {
    if (data) setUser(data.me);
  }, [data]);

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
    <div className={styles.box}>
      {user ? (
        <>
          <NavLink href={`/user/${user.username}`} Icon={BiSolidUser} textPosition={"left"} iconSize={"1.15rem"}>
            {user.username}
          </NavLink>
          <NavButton onClick={handleLogout} Icon={BiLogOut} iconSize={"1.15rem"} />
        </>
      ) : (
        <>
          <NavLink href={"/register"} Icon={BiSolidUser} textPosition={"left"} iconSize={"1.15rem"}>
            register
          </NavLink>
          <NavLink href={"/login"} Icon={BiLogIn} iconSize={"1.15rem"} />
        </>
      )}
    </div>
  );
};
