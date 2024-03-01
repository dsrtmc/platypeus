import React from "react";
import { RaceBox } from "@/app/races/[slug]/RaceBox";
import { getClient } from "@/lib/client";
import { GetRaceDocument } from "@/graphql/generated/graphql";

interface Props {}

export default async function RacePage({ params }: { params: { slug: string } }) {
  const { data, error } = await getClient().query({
    query: GetRaceDocument,
    variables: {
      where: {
        slug: {
          eq: params.slug,
        },
      },
      racersFirst: 0,
    },
  });
  console.log("Data:", data);
  if (!data?.race) return <div>no data yet</div>;
  return (
    // TODO: add a funny error page in case someone types in an ugly ID
    <div>
      <RaceBox race={data.race} />
    </div>
  );
}
