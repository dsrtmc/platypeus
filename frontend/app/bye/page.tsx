"use client";

import { ByeDocument } from "@/graphql/generated/graphql";
import { useLazyQuery, useQuery } from "@apollo/client";

export default function Bye() {
  const { data, loading, error } = useQuery(ByeDocument, { fetchPolicy: "network-only" });
  if (loading) return <div>loading</div>;
  if (error) return <div>error</div>;
  if (!data) return <div>no data</div>;
  if (data) return <div>{JSON.stringify(data)}</div>;
  return <div>shouldnt happen ever</div>;
}
