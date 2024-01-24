/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "fragment UserInfoFragment on User {\n  username\n  email\n}": types.UserInfoFragmentFragmentDoc,
    "mutation CreateRace($input: CreateRaceInput!) {\n  createRace(input: $input) {\n    race {\n      id\n      racers {\n        user {\n          username\n        }\n      }\n      private\n    }\n  }\n}": types.CreateRaceDocument,
    "mutation CreateScore($input: CreateScoreInput!) {\n  createScore(input: $input) {\n    score {\n      id\n      wpm\n      rawWpm\n      mode\n      modeSetting\n      content\n      language\n      user {\n        username\n      }\n    }\n  }\n}": types.CreateScoreDocument,
    "mutation FinishRace($input: FinishRaceInput!) {\n  finishRace(input: $input) {\n    race {\n      racers {\n        user {\n          username\n        }\n        wpm\n        finished\n      }\n      finished\n    }\n    errors {\n      code: __typename\n      ... on Error {\n        message\n      }\n    }\n  }\n}": types.FinishRaceDocument,
    "mutation FinishRaceForUser($input: FinishRaceForUserInput!) {\n  finishRaceForUser(input: $input) {\n    errors {\n      code: __typename\n      ... on Error {\n        message\n      }\n    }\n  }\n}": types.FinishRaceForUserDocument,
    "mutation FlipRunningStatus($input: FlipRunningStatusInput!) {\n  flipRunningStatus(input: $input) {\n    race {\n      running\n    }\n  }\n}": types.FlipRunningStatusDocument,
    "mutation JoinChatbox($input: JoinChatboxInput!) {\n  joinChatbox(input: $input) {\n    chatbox {\n      messages {\n        content\n      }\n    }\n  }\n}": types.JoinChatboxDocument,
    "mutation JoinRace($input: JoinRaceInput!) {\n  joinRace(input: $input) {\n    race {\n      racers {\n        user {\n          username\n        }\n        wpm\n      }\n    }\n  }\n}": types.JoinRaceDocument,
    "mutation LeaveRace($input: LeaveRaceInput!) {\n  leaveRace(input: $input) {\n    race {\n      racers {\n        id\n        user {\n          username\n        }\n      }\n    }\n  }\n}": types.LeaveRaceDocument,
    "mutation Login($input: LoginInput!) {\n  login(input: $input) {\n    user {\n      id\n      ...UserInfoFragment\n    }\n    errors {\n      code: __typename\n      ... on Error {\n        message\n      }\n    }\n  }\n}": types.LoginDocument,
    "mutation Logout {\n  logout {\n    boolean\n  }\n}": types.LogoutDocument,
    "mutation Register($input: RegisterInput!) {\n  register(input: $input) {\n    user {\n      ...UserInfoFragment\n    }\n    errors {\n      code: __typename\n      ... on Error {\n        message\n      }\n    }\n  }\n}": types.RegisterDocument,
    "mutation SendMessage($input: SendMessageInput!) {\n  sendMessage(input: $input) {\n    boolean\n  }\n}": types.SendMessageDocument,
    "mutation StartRace($input: StartRaceInput!) {\n  startRace(input: $input) {\n    race {\n      running\n      updatedAt\n    }\n    errors {\n      code: __typename\n      ... on Error {\n        message\n      }\n    }\n  }\n}": types.StartRaceDocument,
    "mutation UpdateStatsForUser($input: UpdateStatsForUserInput!) {\n  updateStatsForUser(input: $input) {\n    race {\n      racers {\n        user {\n          username\n        }\n        wpm\n        wordsTyped\n      }\n    }\n    errors {\n      code: __typename\n      ... on Error {\n        message\n      }\n    }\n  }\n}": types.UpdateStatsForUserDocument,
    "query Bye {\n  bye\n}": types.ByeDocument,
    "query GetAllUsers {\n  allUsers {\n    id\n    username\n    email\n  }\n}": types.GetAllUsersDocument,
    "query GetRaces($after: String, $before: String, $first: Int, $last: Int, $order: [RaceSortInput!], $where: RaceFilterInput) {\n  races(\n    after: $after\n    before: $before\n    first: $first\n    last: $last\n    order: $order\n    where: $where\n  ) {\n    edges {\n      node {\n        id\n        createdAt\n        racers {\n          user {\n            username\n          }\n          wpm\n        }\n        finished\n      }\n    }\n  }\n}": types.GetRacesDocument,
    "query GetScore($id: UUID!) {\n  score(id: $id) {\n    id\n    wpm\n    rawWpm\n  }\n}": types.GetScoreDocument,
    "query GetScores($after: String, $before: String, $first: Int, $last: Int, $order: [ScoreSortInput!], $where: ScoreFilterInput) {\n  scores(\n    after: $after\n    before: $before\n    first: $first\n    last: $last\n    order: $order\n    where: $where\n  ) {\n    edges {\n      node {\n        id\n        wpm\n        rawWpm\n        accuracy\n        user {\n          username\n        }\n        mode\n        modeSetting\n        content\n        createdAt\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}": types.GetScoresDocument,
    "query GetUserByUsername($username: String!) {\n  userByUsername(username: $username) {\n    id\n    username\n    scores {\n      id\n      wpm\n    }\n    createdAt\n    updatedAt\n  }\n}": types.GetUserByUsernameDocument,
    "query GetUsersBestScores($userId: UUID!) {\n  usersBestScores(userId: $userId) {\n    wpm\n    mode\n    modeSetting\n    accuracy\n  }\n}": types.GetUsersBestScoresDocument,
    "query Me {\n  me {\n    id\n    username\n    email\n    ...UserInfoFragment\n  }\n}": types.MeDocument,
    "subscription OnChatboxEvent($chatboxId: UUID!) {\n  onChatboxEvent(chatboxId: $chatboxId) {\n    messages {\n      id\n      author {\n        username\n      }\n      content\n      createdAt\n    }\n  }\n}": types.OnChatboxEventDocument,
    "subscription OnRaceEvent($raceId: UUID!) {\n  onRaceEvent(raceId: $raceId) {\n    id\n    mode\n    modeSetting\n    racers {\n      id\n      user {\n        username\n      }\n      finished\n      wpm\n      wordsTyped\n    }\n    host {\n      id\n      username\n    }\n    running\n    finished\n    content\n    chatboxId\n    startTime\n  }\n}": types.OnRaceEventDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment UserInfoFragment on User {\n  username\n  email\n}"): (typeof documents)["fragment UserInfoFragment on User {\n  username\n  email\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateRace($input: CreateRaceInput!) {\n  createRace(input: $input) {\n    race {\n      id\n      racers {\n        user {\n          username\n        }\n      }\n      private\n    }\n  }\n}"): (typeof documents)["mutation CreateRace($input: CreateRaceInput!) {\n  createRace(input: $input) {\n    race {\n      id\n      racers {\n        user {\n          username\n        }\n      }\n      private\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateScore($input: CreateScoreInput!) {\n  createScore(input: $input) {\n    score {\n      id\n      wpm\n      rawWpm\n      mode\n      modeSetting\n      content\n      language\n      user {\n        username\n      }\n    }\n  }\n}"): (typeof documents)["mutation CreateScore($input: CreateScoreInput!) {\n  createScore(input: $input) {\n    score {\n      id\n      wpm\n      rawWpm\n      mode\n      modeSetting\n      content\n      language\n      user {\n        username\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation FinishRace($input: FinishRaceInput!) {\n  finishRace(input: $input) {\n    race {\n      racers {\n        user {\n          username\n        }\n        wpm\n        finished\n      }\n      finished\n    }\n    errors {\n      code: __typename\n      ... on Error {\n        message\n      }\n    }\n  }\n}"): (typeof documents)["mutation FinishRace($input: FinishRaceInput!) {\n  finishRace(input: $input) {\n    race {\n      racers {\n        user {\n          username\n        }\n        wpm\n        finished\n      }\n      finished\n    }\n    errors {\n      code: __typename\n      ... on Error {\n        message\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation FinishRaceForUser($input: FinishRaceForUserInput!) {\n  finishRaceForUser(input: $input) {\n    errors {\n      code: __typename\n      ... on Error {\n        message\n      }\n    }\n  }\n}"): (typeof documents)["mutation FinishRaceForUser($input: FinishRaceForUserInput!) {\n  finishRaceForUser(input: $input) {\n    errors {\n      code: __typename\n      ... on Error {\n        message\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation FlipRunningStatus($input: FlipRunningStatusInput!) {\n  flipRunningStatus(input: $input) {\n    race {\n      running\n    }\n  }\n}"): (typeof documents)["mutation FlipRunningStatus($input: FlipRunningStatusInput!) {\n  flipRunningStatus(input: $input) {\n    race {\n      running\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation JoinChatbox($input: JoinChatboxInput!) {\n  joinChatbox(input: $input) {\n    chatbox {\n      messages {\n        content\n      }\n    }\n  }\n}"): (typeof documents)["mutation JoinChatbox($input: JoinChatboxInput!) {\n  joinChatbox(input: $input) {\n    chatbox {\n      messages {\n        content\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation JoinRace($input: JoinRaceInput!) {\n  joinRace(input: $input) {\n    race {\n      racers {\n        user {\n          username\n        }\n        wpm\n      }\n    }\n  }\n}"): (typeof documents)["mutation JoinRace($input: JoinRaceInput!) {\n  joinRace(input: $input) {\n    race {\n      racers {\n        user {\n          username\n        }\n        wpm\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation LeaveRace($input: LeaveRaceInput!) {\n  leaveRace(input: $input) {\n    race {\n      racers {\n        id\n        user {\n          username\n        }\n      }\n    }\n  }\n}"): (typeof documents)["mutation LeaveRace($input: LeaveRaceInput!) {\n  leaveRace(input: $input) {\n    race {\n      racers {\n        id\n        user {\n          username\n        }\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Login($input: LoginInput!) {\n  login(input: $input) {\n    user {\n      id\n      ...UserInfoFragment\n    }\n    errors {\n      code: __typename\n      ... on Error {\n        message\n      }\n    }\n  }\n}"): (typeof documents)["mutation Login($input: LoginInput!) {\n  login(input: $input) {\n    user {\n      id\n      ...UserInfoFragment\n    }\n    errors {\n      code: __typename\n      ... on Error {\n        message\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Logout {\n  logout {\n    boolean\n  }\n}"): (typeof documents)["mutation Logout {\n  logout {\n    boolean\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Register($input: RegisterInput!) {\n  register(input: $input) {\n    user {\n      ...UserInfoFragment\n    }\n    errors {\n      code: __typename\n      ... on Error {\n        message\n      }\n    }\n  }\n}"): (typeof documents)["mutation Register($input: RegisterInput!) {\n  register(input: $input) {\n    user {\n      ...UserInfoFragment\n    }\n    errors {\n      code: __typename\n      ... on Error {\n        message\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation SendMessage($input: SendMessageInput!) {\n  sendMessage(input: $input) {\n    boolean\n  }\n}"): (typeof documents)["mutation SendMessage($input: SendMessageInput!) {\n  sendMessage(input: $input) {\n    boolean\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation StartRace($input: StartRaceInput!) {\n  startRace(input: $input) {\n    race {\n      running\n      updatedAt\n    }\n    errors {\n      code: __typename\n      ... on Error {\n        message\n      }\n    }\n  }\n}"): (typeof documents)["mutation StartRace($input: StartRaceInput!) {\n  startRace(input: $input) {\n    race {\n      running\n      updatedAt\n    }\n    errors {\n      code: __typename\n      ... on Error {\n        message\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateStatsForUser($input: UpdateStatsForUserInput!) {\n  updateStatsForUser(input: $input) {\n    race {\n      racers {\n        user {\n          username\n        }\n        wpm\n        wordsTyped\n      }\n    }\n    errors {\n      code: __typename\n      ... on Error {\n        message\n      }\n    }\n  }\n}"): (typeof documents)["mutation UpdateStatsForUser($input: UpdateStatsForUserInput!) {\n  updateStatsForUser(input: $input) {\n    race {\n      racers {\n        user {\n          username\n        }\n        wpm\n        wordsTyped\n      }\n    }\n    errors {\n      code: __typename\n      ... on Error {\n        message\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Bye {\n  bye\n}"): (typeof documents)["query Bye {\n  bye\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetAllUsers {\n  allUsers {\n    id\n    username\n    email\n  }\n}"): (typeof documents)["query GetAllUsers {\n  allUsers {\n    id\n    username\n    email\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetRaces($after: String, $before: String, $first: Int, $last: Int, $order: [RaceSortInput!], $where: RaceFilterInput) {\n  races(\n    after: $after\n    before: $before\n    first: $first\n    last: $last\n    order: $order\n    where: $where\n  ) {\n    edges {\n      node {\n        id\n        createdAt\n        racers {\n          user {\n            username\n          }\n          wpm\n        }\n        finished\n      }\n    }\n  }\n}"): (typeof documents)["query GetRaces($after: String, $before: String, $first: Int, $last: Int, $order: [RaceSortInput!], $where: RaceFilterInput) {\n  races(\n    after: $after\n    before: $before\n    first: $first\n    last: $last\n    order: $order\n    where: $where\n  ) {\n    edges {\n      node {\n        id\n        createdAt\n        racers {\n          user {\n            username\n          }\n          wpm\n        }\n        finished\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetScore($id: UUID!) {\n  score(id: $id) {\n    id\n    wpm\n    rawWpm\n  }\n}"): (typeof documents)["query GetScore($id: UUID!) {\n  score(id: $id) {\n    id\n    wpm\n    rawWpm\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetScores($after: String, $before: String, $first: Int, $last: Int, $order: [ScoreSortInput!], $where: ScoreFilterInput) {\n  scores(\n    after: $after\n    before: $before\n    first: $first\n    last: $last\n    order: $order\n    where: $where\n  ) {\n    edges {\n      node {\n        id\n        wpm\n        rawWpm\n        accuracy\n        user {\n          username\n        }\n        mode\n        modeSetting\n        content\n        createdAt\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}"): (typeof documents)["query GetScores($after: String, $before: String, $first: Int, $last: Int, $order: [ScoreSortInput!], $where: ScoreFilterInput) {\n  scores(\n    after: $after\n    before: $before\n    first: $first\n    last: $last\n    order: $order\n    where: $where\n  ) {\n    edges {\n      node {\n        id\n        wpm\n        rawWpm\n        accuracy\n        user {\n          username\n        }\n        mode\n        modeSetting\n        content\n        createdAt\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetUserByUsername($username: String!) {\n  userByUsername(username: $username) {\n    id\n    username\n    scores {\n      id\n      wpm\n    }\n    createdAt\n    updatedAt\n  }\n}"): (typeof documents)["query GetUserByUsername($username: String!) {\n  userByUsername(username: $username) {\n    id\n    username\n    scores {\n      id\n      wpm\n    }\n    createdAt\n    updatedAt\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetUsersBestScores($userId: UUID!) {\n  usersBestScores(userId: $userId) {\n    wpm\n    mode\n    modeSetting\n    accuracy\n  }\n}"): (typeof documents)["query GetUsersBestScores($userId: UUID!) {\n  usersBestScores(userId: $userId) {\n    wpm\n    mode\n    modeSetting\n    accuracy\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Me {\n  me {\n    id\n    username\n    email\n    ...UserInfoFragment\n  }\n}"): (typeof documents)["query Me {\n  me {\n    id\n    username\n    email\n    ...UserInfoFragment\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "subscription OnChatboxEvent($chatboxId: UUID!) {\n  onChatboxEvent(chatboxId: $chatboxId) {\n    messages {\n      id\n      author {\n        username\n      }\n      content\n      createdAt\n    }\n  }\n}"): (typeof documents)["subscription OnChatboxEvent($chatboxId: UUID!) {\n  onChatboxEvent(chatboxId: $chatboxId) {\n    messages {\n      id\n      author {\n        username\n      }\n      content\n      createdAt\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "subscription OnRaceEvent($raceId: UUID!) {\n  onRaceEvent(raceId: $raceId) {\n    id\n    mode\n    modeSetting\n    racers {\n      id\n      user {\n        username\n      }\n      finished\n      wpm\n      wordsTyped\n    }\n    host {\n      id\n      username\n    }\n    running\n    finished\n    content\n    chatboxId\n    startTime\n  }\n}"): (typeof documents)["subscription OnRaceEvent($raceId: UUID!) {\n  onRaceEvent(raceId: $raceId) {\n    id\n    mode\n    modeSetting\n    racers {\n      id\n      user {\n        username\n      }\n      finished\n      wpm\n      wordsTyped\n    }\n    host {\n      id\n      username\n    }\n    running\n    finished\n    content\n    chatboxId\n    startTime\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;