import React from "react";
import { RaceBox } from "@/app/races/[id]/RaceBox";
import { getClient } from "@/lib/client";
import { JoinChatboxDocument } from "@/graphql/generated/graphql";
import { Chatbox } from "@/app/races/[id]/Chatbox";

interface Props {}

export default async function RacePage({ params }: { params: { id: string } }) {
  // const response = await getClient().mutate({ mutation: JoinChatboxDocument,
  //   variables: {
  //     raceId: "",
  //     userId: "",
  //   } as any,
  // });
  // console.log("THE RESPONSE ADOLF HITLER:", response);
  return (
    // TODO: add a funny error page in case someone types in an ugly ID
    <div>
      <RaceBox raceId={params.id} />
    </div>
  );
}
