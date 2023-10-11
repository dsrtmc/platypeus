"use client";

import styles from "@/components/navbar/Navbar.module.css";
import React, { useEffect, useState } from "react";
import { useMutation, useSuspenseQuery } from "@apollo/client";
import { LogoutDocument, MeDocument, MeQuery } from "@/graphql/generated/graphql";
import { BiLogIn, BiLogOut, BiSolidUser, BiUser } from "react-icons/bi";
import { LogoutButton } from "@/components/navbar/LogoutButton";
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
          <NavLink href={`/user/${user.username}`} Icon={BiSolidUser} textPosition={"left"}>
            {user.username}
          </NavLink>
          <NavButton onClick={handleLogout} Icon={BiLogOut} />
        </>
      ) : (
        <>
          <NavLink href={"/register"} Icon={BiSolidUser} textPosition={"left"}>
            register
          </NavLink>
          <NavLink href={"/login"} Icon={BiLogIn} /> {/* why does its size not change lol */}
        </>
      )}
    </div>
  );
};
