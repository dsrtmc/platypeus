import { getClient } from "@/lib/client";
import styles from "./User.module.css";
import {
  GetScoresDocument,
  GetScoresQueryVariables,
  GetUsersBestScoresDocument,
  UserPage_GetUserDailyScoreSummariesDocument,
  UserPage_GetUserDailyScoreSummariesQueryVariables,
  UserPage_GetUserDocument,
  UserPage_GetUserMonthlyScoreSummariesDocument,
  UserPage_GetUserMonthlyScoreSummariesQueryVariables,
} from "@/graphql/generated/graphql";
import { PerformanceChart } from "@/app/user/[username]/PerformanceChart";
import UserInfo from "@/app/user/[username]/UserInfo";

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
  const { data: scoresData } = await getClient().query({
    query: UserPage_GetUserMonthlyScoreSummariesDocument,
    variables: {
      userId: data.user.id,
    } as UserPage_GetUserMonthlyScoreSummariesQueryVariables,
  });
  return (
    <div>
      <UserInfo user={data.user} />
      <div className={styles.box}></div>
      <PerformanceChart scores={scoresData.userMonthlyScoreSummaries} />
    </div>
  );
}
