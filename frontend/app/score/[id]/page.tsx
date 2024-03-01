import { getClient } from "@/lib/client";
import { GetScoreDocument } from "@/graphql/generated/graphql";

export default async function ScorePage({ params }: { params: { id: string } }) {
  const { data } = await getClient().query({
    query: GetScoreDocument,
    variables: {
      where: {
        id: {
          eq: params.id,
        },
      },
    },
  });
  console.log("Data:", data);
  return (
    <div>
      this is the <code>score</code> page
      <h1>WPM: {data.score?.wpm}</h1>
      <h2>raw WPM: {data.score?.rawWpm}</h2>
    </div>
  );
}
