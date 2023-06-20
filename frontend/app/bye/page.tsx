"use client";

import { ByeDocument } from "@/graphql/generated/graphql";
import { useLazyQuery, useQuery } from "@apollo/client";

export default function Bye() {
  const { data, loading, error } = useQuery(ByeDocument, { fetchPolicy: "network-only" });
  const [getBye, { data1, error1 }] = useLazyQuery(ByeDocument, { fetchPolicy: "network-only" });
  console.log("bye:", data);
  if (loading) return <div>loading</div>;
  if (error)
    return (
      <div>
        error
        <button
          onClick={async () => {
            await getBye();
            console.log(data1);
            console.log(error1);
          }}
        >
          try fetch
        </button>
      </div>
    );
  if (!data) return <div>no data</div>;
  if (data)
    return (
      <div>
        {JSON.stringify(data)}
        <button
          onClick={async () => {
            await getBye();
            console.log(data1);
            console.log(error1);
          }}
        >
          try fetch
        </button>
      </div>
    );
  return <div>shouldnt happen ever</div>;
}
