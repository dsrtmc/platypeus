import { getClient } from "@/lib/client";
import styles from "./User.module.css";
import {
  GetScoresDocument,
  GetScoresQueryVariables,
  GetUsersBestScoresDocument,
  UserPage_GetUserDocument,
  UserPage_GetUserMonthlyScoreSummariesDocument,
  UserPage_GetUserMonthlyScoreSummariesQueryVariables,
} from "@/graphql/generated/graphql";
import { PerformanceChart } from "@/app/user/[username]/PerformanceChart";
import UserInfo from "@/app/user/[username]/UserInfo";
import { BestUserScoresBox } from "@/app/user/[username]/BestUserScoresBox";

// TODO: CONSIDER GOING FOR ROUTE-SPECIFIC QUERIES SO THAT WE AVOID OVER-FETCHING
export default async function UserPage({ params }: { params: { username: string } }) {
  const { data } = await getClient().query({
    query: UserPage_GetUserDocument,
    variables: {
      where: {
        username: {
          eq: params.username,
        },
      },
    },
  });
  if (!data?.user) return <div>no such user</div>;
  // TODO: cache is fkd i think idk, even if i do ctrl + f5 it still gets me stale data despite the server getting it correctly
  const { data: scoresData } = await getClient().query({
    query: UserPage_GetUserMonthlyScoreSummariesDocument,
    variables: {
      userId: data.user.id,
    } as UserPage_GetUserMonthlyScoreSummariesQueryVariables,
  });
  return (
    <div className={styles.main}>
      <UserInfo user={data.user} />
      <PerformanceChart scores={scoresData.userMonthlyScoreSummaries} />
      <BestUserScoresBox user={data.user} />
    </div>
  );
}
