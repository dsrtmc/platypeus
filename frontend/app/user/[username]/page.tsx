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
import { Metadata } from "next";

type Props = {
  params: { username: string };
};

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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `${params.username}'s profile`,
  };
}

export default async function UserPage({ params }: Props) {
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
