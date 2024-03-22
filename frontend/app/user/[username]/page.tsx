import { getClient } from "@/lib/client";
import styles from "./User.module.css";
import {
  UserPage_GetUserDocument,
  UserPage_GetUserMonthlyScoreSummariesDocument,
  UserPage_GetUserMonthlyScoreSummariesQueryVariables,
} from "@/graphql/generated/graphql";
import { PerformanceChart } from "@/app/user/[username]/PerformanceChart";
import UserInfo from "@/app/user/[username]/UserInfo";
import { BestUserScoresBox } from "@/app/user/[username]/BestUserScoresBox";
import { notFound } from "next/navigation";
import React from "react";
import { gql } from "@apollo/client";

const GetUser = gql`
  query UserPage_GetUser($where: UserFilterInput) {
    user(where: $where) {
      id
      username
      averageWpm
      scoreCount
      createdAt
    }
  }
`;

const GetUserMonthlyScoreSummaries = gql`
  query UserPage_GetUserMonthlyScoreSummaries($userId: UUID!) {
    userMonthlyScoreSummaries(userId: $userId) {
      wpm
      rawWpm
      accuracy
      date
    }
  }
`;

export default async function UserPage({ params }: { params: { username: string } }) {
  const { data, error } = await getClient().query({
    query: UserPage_GetUserDocument,
    variables: {
      where: {
        username: {
          eq: params.username,
        },
      },
    },
  });
  if (!data?.user) {
    notFound();
  }

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
