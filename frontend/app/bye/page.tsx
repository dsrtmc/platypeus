import { ByeDocument } from "@/graphql/generated/graphql";
import { getClient } from "@/lib/client";

export default async function Bye() {
  const { data, loading, error } = await getClient().query({ query: ByeDocument, fetchPolicy: "network-only" });
  if (loading) return <div>loading</div>;
  if (error) return <div>error</div>;
  if (!data) return <div>no data</div>;
  if (data) return <div>{JSON.stringify(data)}</div>;
  return <div>shouldnt happen ever</div>;
}
