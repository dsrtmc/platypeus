"use client";

import { ByeDocument, MeDocument } from "@/graphql/generated/graphql";
import { useLazyQuery, useQuery } from "@apollo/client";
import { getAccessToken } from "@/accessToken";

export default function Bye() {
  const { data, loading, error } = useQuery(ByeDocument, { fetchPolicy: "network-only" });
  const [fetchMe, { data: dataMe, error: errorMe }] = useLazyQuery(MeDocument, { fetchPolicy: "network-only" });
  let body = (
    <>
      <button onClick={() => console.log(dataMe)}>log me</button>
      <button
        onClick={async () => {
          await fetchMe();
          console.log("access token:", getAccessToken());
        }}
      >
        get me
      </button>
    </>
  );
  if (loading) return <div>loading</div>;
  if (error) return <div>error{body}</div>;
  if (!data) return <div>no data</div>;
  if (data)
    return (
      <div>
        {JSON.stringify(data)}
        {body}
      </div>
    );
  return <div>shouldnt happen ever</div>;
}
