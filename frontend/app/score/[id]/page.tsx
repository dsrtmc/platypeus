import { getClient } from "@/lib/client";
import { GetScoreDocument } from "@/graphql/generated/graphql";

export default async function Score({ params }: { params: { id: string } }) {
  const { data } = await getClient().query({
    query: GetScoreDocument,
    variables: {
      id: params.id,
    },
  });
  return (
    <div>
      this is the <code>score</code> page
      <h1>avg WPM: {data.score?.averageWpm}</h1>
      <h2>raw WPM: {data.score?.rawWpm}</h2>
      <h3>time setting: {data.score?.time}</h3>
    </div>
  );
}
