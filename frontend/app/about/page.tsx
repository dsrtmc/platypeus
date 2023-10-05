import React, { Suspense } from "react";
import { TestComponent } from "@/app/about/TestComponent";
import { getClient } from "@/lib/client";
import { MeDocument } from "@/graphql/generated/graphql";

interface Props {}

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  if (!process.browser) {
    console.log("WE ARE ON THE SERVER FOR WHATEVER HITLER REASON");
  }
  const response = await getClient().query({ query: MeDocument });
  // THIS WORKS ITS SO GOOD ITS SO GOOD TODO: MOVE THE LOGIC TO NAVBAR SHEEEEEEEEEEEEEEEEEEEEEEEEEEESH
  // thank you https://stackoverflow.com/users/4345841/teos you are the best <3
  return (
    <div>
      we love <code>platypeus</code>
      <Suspense fallback={"IODUY CIUNYODYOTBNDSTY F YTIOSFTYINOUBSTYBUITGYUIOSG IOTYSITGYNOUF"}>
        <TestComponent initial={response.data.me} />
      </Suspense>
    </div>
  );
}
