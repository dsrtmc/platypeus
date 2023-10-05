"use client";

import React, { Suspense, useState } from "react";
import { useSuspenseQuery } from "@apollo/client";
import { GetAllUsersDocument, MeDocument } from "@/graphql/generated/graphql";

interface Props {
  initial: { __typename?: "User"; id: any; username: string } | null | undefined;
}

// tell Next.js not to cache this page, so we don’t get stale data when reloading.
export const dynamic = "force-dynamic";

export const TestComponent: React.FC<Props> = ({ initial }) => {
  const { data } = useSuspenseQuery(MeDocument);
  const [user, setUser] = useState(data?.me ? data.me : initial);
  return <p style={{ color: "white" }}>{user?.username}</p>;
};
