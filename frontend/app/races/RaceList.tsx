import React from "react";
import { getClient } from "@/lib/client";
import { GetRacesDocument, MeDocument } from "@/graphql/generated/graphql";
import { RaceCard } from "@/app/races/RaceCard";

interface Props {}

export async function RaceList({}) {
  const response = await getClient().query({ query: GetRacesDocument });
  console.log("The response we got:", response);
  return (
    <div>
      {response.data.races?.edges?.map((edge) => (
        <RaceCard node={edge.node} />
      ))}
      hello that is a race lista<code>sadkljfasdfjkl</code>
    </div>
  );
}
