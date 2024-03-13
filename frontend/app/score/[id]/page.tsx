import { getClient } from "@/lib/client";
import { ScorePage_GetScoreDocument } from "@/graphql/generated/graphql";
import { gql } from "@apollo/client";

const GetScore = gql`
  query ScorePage_GetScore($where: ScoreFilterInput) {
    score(where: $where) {
      id
      wpm
      rawWpm
    }
  }
`;

export default async function ScorePage({ params }: { params: { id: string } }) {
  const { data } = await getClient().query({
    query: ScorePage_GetScoreDocument,
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
