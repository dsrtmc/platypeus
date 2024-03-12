"use client";

import React, { useEffect, useState } from "react";
import { gql, useMutation, useSuspenseQuery } from "@apollo/client";
import { AuthBox_LogoutDocument, Navbar_MeDocument, Navbar_MeQuery } from "@/graphql/generated/graphql";
import { BiLogIn, BiLogOut, BiSolidUser } from "react-icons/bi";
import { NavLink } from "@/components/navbar/NavLink";
import { NavButton } from "@/components/navbar/NavButton";
import { useRouter } from "next/navigation";

interface Props {
  initial: Navbar_MeQuery["me"];
}

const LogoutMutation = gql`
  mutation AuthBox_Logout {
    logout {
      boolean
    }
  }
`;

export const AuthBox: React.FC<Props> = ({ initial }) => {
  const router = useRouter();

  const { data } = useSuspenseQuery(Navbar_MeDocument);
  const [logout, { client }] = useMutation(AuthBox_LogoutDocument);

  const [user, setUser] = useState(data?.me ? data.me : initial);

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
    <>
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
    </>
  );
};
