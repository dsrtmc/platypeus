import { getClient } from "@/lib/client";
import styles from "./User.module.css";
import {
  GetScoresDocument,
  GetScoresQueryVariables,
  GetUserByUsernameDocument,
  GetUsersBestScoresDocument,
} from "@/graphql/generated/graphql";
import { PerformanceChart } from "@/app/user/[username]/PerformanceChart";

export default async function UserPage({ params }: { params: { username: string } }) {
  const { data: userData } = await getClient().query({
    query: GetUserByUsernameDocument,
    variables: {
      username: params.username,
    },
  });
  if (!userData.userByUsername) return <div>no such user</div>;
  const { data: bestScoresData } = await getClient().query({
    query: GetUsersBestScoresDocument,
    variables: {
      userId: userData.userByUsername?.id,
    },
  });
  const { data: scoresData } = await getClient().query({
    query: GetScoresDocument,
    variables: {
      where: {
        user: {
          username: {
            eq: params.username,
          },
        },
      },
    } as GetScoresQueryVariables,
  });
  return (
    <div>
      <div>
        this account has been created on<code>{JSON.stringify(new Date(userData.userByUsername.createdAt))}</code>
      </div>
      <div className={styles.box}>
        {/* TODO: Fix nullable stuff here, we shouldn't have gaps */}
        {bestScoresData.usersBestScores.map((score) => (
          <div key={score?.modeSetting} className={styles.group}>
            <div className={styles.test}>{score?.modeSetting} seconds</div>
            <div className={styles.wpm}>{score?.wpm}</div>
            <div className={styles.accuracy}>{score?.accuracy.toFixed(2) * 100}%</div>
          </div>
        ))}
      </div>
      <PerformanceChart scoresData={scoresData} />
    </div>
  );
}
