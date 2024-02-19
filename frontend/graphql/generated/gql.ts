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
    "mutation CreateRace($input: CreateRaceInput!) {\n  createRace(input: $input) {\n    race {\n      id\n      private\n    }\n  }\n}": types.CreateRaceDocument,
    "mutation CreateScore($input: CreateScoreInput!) {\n  createScore(input: $input) {\n    score {\n      id\n      wpm\n      rawWpm\n      mode\n      modeSetting\n      content\n      language\n      user {\n        username\n      }\n    }\n  }\n}": types.CreateScoreDocument,
    "mutation FinishRace($input: FinishRaceInput!) {\n  finishRace(input: $input) {\n    race {\n      id\n    }\n    errors {\n      code: __typename\n      ... on Error {\n        message\n      }\n    }\n  }\n}": types.FinishRaceDocument,
    "mutation FinishRaceForUser($input: FinishRaceForUserInput!) {\n  finishRaceForUser(input: $input) {\n    race {\n      id\n    }\n    errors {\n      code: __typename\n      ... on Error {\n        message\n      }\n    }\n  }\n}": types.FinishRaceForUserDocument,
    "mutation JoinChatbox($input: JoinChatboxInput!) {\n  joinChatbox(input: $input) {\n    chatbox {\n      messages {\n        edges {\n          node {\n            content\n          }\n        }\n      }\n    }\n  }\n}": types.JoinChatboxDocument,
    "mutation JoinRace($input: JoinRaceInput!) {\n  joinRace(input: $input) {\n    race {\n      id\n    }\n  }\n}": types.JoinRaceDocument,
    "mutation LeaveRace($input: LeaveRaceInput!) {\n  leaveRace(input: $input) {\n    race {\n      id\n    }\n  }\n}": types.LeaveRaceDocument,
    "mutation Login($input: LoginInput!) {\n  login(input: $input) {\n    user {\n      id\n      ...UserInfoFragment\n    }\n    errors {\n      code: __typename\n      ... on Error {\n        message\n      }\n    }\n  }\n}": types.LoginDocument,
    "mutation Logout {\n  logout {\n    boolean\n  }\n}": types.LogoutDocument,
    "mutation Register($input: RegisterInput!) {\n  register(input: $input) {\n    user {\n      ...UserInfoFragment\n    }\n    errors {\n      code: __typename\n      ... on Error {\n        message\n      }\n    }\n  }\n}": types.RegisterDocument,
    "mutation RunRace($input: RunRaceInput!) {\n  runRace(input: $input) {\n    race {\n      running\n    }\n    errors {\n      code: __typename\n      ... on Error {\n        message\n      }\n    }\n  }\n}": types.RunRaceDocument,
    "mutation SendMessage($input: SendMessageInput!) {\n  sendMessage(input: $input) {\n    boolean\n  }\n}": types.SendMessageDocument,
    "mutation StartRace($input: StartRaceInput!) {\n  startRace(input: $input) {\n    race {\n      started\n      running\n      updatedAt\n    }\n    errors {\n      code: __typename\n      ... on Error {\n        message\n      }\n    }\n  }\n}": types.StartRaceDocument,
    "mutation UpdateStatsForUser($input: UpdateStatsForUserInput!) {\n  updateStatsForUser(input: $input) {\n    race {\n      id\n    }\n    errors {\n      code: __typename\n      ... on Error {\n        message\n      }\n    }\n  }\n}": types.UpdateStatsForUserDocument,
    "query Bye {\n  bye\n}": types.ByeDocument,
    "query GetAllUsers {\n  allUsers {\n    id\n    username\n    email\n  }\n}": types.GetAllUsersDocument,
    "query GetRaces($after: String, $before: String, $racesFirst: Int, $racesLast: Int, $order: [RaceSortInput!], $where: RaceFilterInput, $racersFirst: Int) {\n  races(\n    after: $after\n    before: $before\n    first: $racesFirst\n    last: $racesLast\n    order: $order\n    where: $where\n  ) {\n    edges {\n      node {\n        id\n        createdAt\n        racers(first: $racersFirst) {\n          edges {\n            node {\n              user {\n                username\n              }\n              wpm\n            }\n          }\n        }\n        host {\n          username\n        }\n        finished\n      }\n    }\n  }\n}": types.GetRacesDocument,
    "query GetScore($id: UUID!) {\n  score(id: $id) {\n    id\n    wpm\n    rawWpm\n  }\n}": types.GetScoreDocument,
    "query GetScores($after: String, $before: String, $first: Int, $last: Int, $order: [ScoreSortInput!], $where: ScoreFilterInput) {\n  scores(\n    after: $after\n    before: $before\n    first: $first\n    last: $last\n    order: $order\n    where: $where\n  ) {\n    edges {\n      node {\n        id\n        wpm\n        rawWpm\n        accuracy\n        userId\n        user {\n          username\n        }\n        mode\n        modeSetting\n        content\n        createdAt\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}": types.GetScoresDocument,
    "query GetScoresForLeaderboard($after: String, $before: String, $first: Int, $last: Int, $order: [ScoreSortInput!], $where: ScoreFilterInput) {\n  scoresForLeaderboard(\n    after: $after\n    before: $before\n    first: $first\n    last: $last\n    order: $order\n    where: $where\n  ) {\n    edges {\n      node {\n        id\n        wpm\n        rawWpm\n        accuracy\n        user {\n          username\n        }\n        mode\n        modeSetting\n        content\n        createdAt\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}": types.GetScoresForLeaderboardDocument,
    "query GetUserByUsername($username: String!) {\n  userByUsername(username: $username) {\n    id\n    username\n    scores {\n      edges {\n        node {\n          id\n          wpm\n        }\n      }\n    }\n    createdAt\n    updatedAt\n  }\n}": types.GetUserByUsernameDocument,
    "query GetUsersBestScores($userId: UUID!) {\n  usersBestScores(userId: $userId) {\n    wpm\n    mode\n    modeSetting\n    accuracy\n  }\n}": types.GetUsersBestScoresDocument,
    "query Me {\n  me {\n    id\n    username\n    email\n    ...UserInfoFragment\n  }\n}": types.MeDocument,
    "query UserPage_GetUser($where: UserFilterInput) {\n  user(where: $where) {\n    id\n    username\n    createdAt\n    updatedAt\n  }\n}": types.UserPage_GetUserDocument,
    "subscription OnChatboxEvent($chatboxId: UUID!, $messagesFirst: Int) {\n  onChatboxEvent(chatboxId: $chatboxId) {\n    messages(first: $messagesFirst) {\n      edges {\n        node {\n          id\n          author {\n            username\n          }\n          content\n          createdAt\n        }\n      }\n    }\n  }\n}": types.OnChatboxEventDocument,
    "subscription OnRaceEvent($raceId: UUID!, $racersFirst: Int) {\n  onRaceEvent(raceId: $raceId) {\n    id\n    mode\n    modeSetting\n    racers(first: $racersFirst) {\n      edges {\n        node {\n          id\n          user {\n            id\n            username\n          }\n          finished\n          wpm\n          wordsTyped\n        }\n      }\n    }\n    host {\n      id\n      username\n    }\n    started\n    running\n    finished\n    content\n    chatboxId\n    startTime\n  }\n}": types.OnRaceEventDocument,
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
export function graphql(source: "mutation CreateRace($input: CreateRaceInput!) {\n  createRace(input: $input) {\n    race {\n      id\n      private\n    }\n  }\n}"): (typeof documents)["mutation CreateRace($input: CreateRaceInput!) {\n  createRace(input: $input) {\n    race {\n      id\n      private\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateScore($input: CreateScoreInput!) {\n  createScore(input: $input) {\n    score {\n      id\n      wpm\n      rawWpm\n      mode\n      modeSetting\n      content\n      language\n      user {\n        username\n      }\n    }\n  }\n}"): (typeof documents)["mutation CreateScore($input: CreateScoreInput!) {\n  createScore(input: $input) {\n    score {\n      id\n      wpm\n      rawWpm\n      mode\n      modeSetting\n      content\n      language\n      user {\n        username\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation FinishRace($input: FinishRaceInput!) {\n  finishRace(input: $input) {\n    race {\n      id\n    }\n    errors {\n      code: __typename\n      ... on Error {\n        message\n      }\n    }\n  }\n}"): (typeof documents)["mutation FinishRace($input: FinishRaceInput!) {\n  finishRace(input: $input) {\n    race {\n      id\n    }\n    errors {\n      code: __typename\n      ... on Error {\n        message\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation FinishRaceForUser($input: FinishRaceForUserInput!) {\n  finishRaceForUser(input: $input) {\n    race {\n      id\n    }\n    errors {\n      code: __typename\n      ... on Error {\n        message\n      }\n    }\n  }\n}"): (typeof documents)["mutation FinishRaceForUser($input: FinishRaceForUserInput!) {\n  finishRaceForUser(input: $input) {\n    race {\n      id\n    }\n    errors {\n      code: __typename\n      ... on Error {\n        message\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation JoinChatbox($input: JoinChatboxInput!) {\n  joinChatbox(input: $input) {\n    chatbox {\n      messages {\n        edges {\n          node {\n            content\n          }\n        }\n      }\n    }\n  }\n}"): (typeof documents)["mutation JoinChatbox($input: JoinChatboxInput!) {\n  joinChatbox(input: $input) {\n    chatbox {\n      messages {\n        edges {\n          node {\n            content\n          }\n        }\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation JoinRace($input: JoinRaceInput!) {\n  joinRace(input: $input) {\n    race {\n      id\n    }\n  }\n}"): (typeof documents)["mutation JoinRace($input: JoinRaceInput!) {\n  joinRace(input: $input) {\n    race {\n      id\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation LeaveRace($input: LeaveRaceInput!) {\n  leaveRace(input: $input) {\n    race {\n      id\n    }\n  }\n}"): (typeof documents)["mutation LeaveRace($input: LeaveRaceInput!) {\n  leaveRace(input: $input) {\n    race {\n      id\n    }\n  }\n}"];
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
export function graphql(source: "mutation RunRace($input: RunRaceInput!) {\n  runRace(input: $input) {\n    race {\n      running\n    }\n    errors {\n      code: __typename\n      ... on Error {\n        message\n      }\n    }\n  }\n}"): (typeof documents)["mutation RunRace($input: RunRaceInput!) {\n  runRace(input: $input) {\n    race {\n      running\n    }\n    errors {\n      code: __typename\n      ... on Error {\n        message\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation SendMessage($input: SendMessageInput!) {\n  sendMessage(input: $input) {\n    boolean\n  }\n}"): (typeof documents)["mutation SendMessage($input: SendMessageInput!) {\n  sendMessage(input: $input) {\n    boolean\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation StartRace($input: StartRaceInput!) {\n  startRace(input: $input) {\n    race {\n      started\n      running\n      updatedAt\n    }\n    errors {\n      code: __typename\n      ... on Error {\n        message\n      }\n    }\n  }\n}"): (typeof documents)["mutation StartRace($input: StartRaceInput!) {\n  startRace(input: $input) {\n    race {\n      started\n      running\n      updatedAt\n    }\n    errors {\n      code: __typename\n      ... on Error {\n        message\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateStatsForUser($input: UpdateStatsForUserInput!) {\n  updateStatsForUser(input: $input) {\n    race {\n      id\n    }\n    errors {\n      code: __typename\n      ... on Error {\n        message\n      }\n    }\n  }\n}"): (typeof documents)["mutation UpdateStatsForUser($input: UpdateStatsForUserInput!) {\n  updateStatsForUser(input: $input) {\n    race {\n      id\n    }\n    errors {\n      code: __typename\n      ... on Error {\n        message\n      }\n    }\n  }\n}"];
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
export function graphql(source: "query GetRaces($after: String, $before: String, $racesFirst: Int, $racesLast: Int, $order: [RaceSortInput!], $where: RaceFilterInput, $racersFirst: Int) {\n  races(\n    after: $after\n    before: $before\n    first: $racesFirst\n    last: $racesLast\n    order: $order\n    where: $where\n  ) {\n    edges {\n      node {\n        id\n        createdAt\n        racers(first: $racersFirst) {\n          edges {\n            node {\n              user {\n                username\n              }\n              wpm\n            }\n          }\n        }\n        host {\n          username\n        }\n        finished\n      }\n    }\n  }\n}"): (typeof documents)["query GetRaces($after: String, $before: String, $racesFirst: Int, $racesLast: Int, $order: [RaceSortInput!], $where: RaceFilterInput, $racersFirst: Int) {\n  races(\n    after: $after\n    before: $before\n    first: $racesFirst\n    last: $racesLast\n    order: $order\n    where: $where\n  ) {\n    edges {\n      node {\n        id\n        createdAt\n        racers(first: $racersFirst) {\n          edges {\n            node {\n              user {\n                username\n              }\n              wpm\n            }\n          }\n        }\n        host {\n          username\n        }\n        finished\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetScore($id: UUID!) {\n  score(id: $id) {\n    id\n    wpm\n    rawWpm\n  }\n}"): (typeof documents)["query GetScore($id: UUID!) {\n  score(id: $id) {\n    id\n    wpm\n    rawWpm\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetScores($after: String, $before: String, $first: Int, $last: Int, $order: [ScoreSortInput!], $where: ScoreFilterInput) {\n  scores(\n    after: $after\n    before: $before\n    first: $first\n    last: $last\n    order: $order\n    where: $where\n  ) {\n    edges {\n      node {\n        id\n        wpm\n        rawWpm\n        accuracy\n        userId\n        user {\n          username\n        }\n        mode\n        modeSetting\n        content\n        createdAt\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}"): (typeof documents)["query GetScores($after: String, $before: String, $first: Int, $last: Int, $order: [ScoreSortInput!], $where: ScoreFilterInput) {\n  scores(\n    after: $after\n    before: $before\n    first: $first\n    last: $last\n    order: $order\n    where: $where\n  ) {\n    edges {\n      node {\n        id\n        wpm\n        rawWpm\n        accuracy\n        userId\n        user {\n          username\n        }\n        mode\n        modeSetting\n        content\n        createdAt\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetScoresForLeaderboard($after: String, $before: String, $first: Int, $last: Int, $order: [ScoreSortInput!], $where: ScoreFilterInput) {\n  scoresForLeaderboard(\n    after: $after\n    before: $before\n    first: $first\n    last: $last\n    order: $order\n    where: $where\n  ) {\n    edges {\n      node {\n        id\n        wpm\n        rawWpm\n        accuracy\n        user {\n          username\n        }\n        mode\n        modeSetting\n        content\n        createdAt\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}"): (typeof documents)["query GetScoresForLeaderboard($after: String, $before: String, $first: Int, $last: Int, $order: [ScoreSortInput!], $where: ScoreFilterInput) {\n  scoresForLeaderboard(\n    after: $after\n    before: $before\n    first: $first\n    last: $last\n    order: $order\n    where: $where\n  ) {\n    edges {\n      node {\n        id\n        wpm\n        rawWpm\n        accuracy\n        user {\n          username\n        }\n        mode\n        modeSetting\n        content\n        createdAt\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetUserByUsername($username: String!) {\n  userByUsername(username: $username) {\n    id\n    username\n    scores {\n      edges {\n        node {\n          id\n          wpm\n        }\n      }\n    }\n    createdAt\n    updatedAt\n  }\n}"): (typeof documents)["query GetUserByUsername($username: String!) {\n  userByUsername(username: $username) {\n    id\n    username\n    scores {\n      edges {\n        node {\n          id\n          wpm\n        }\n      }\n    }\n    createdAt\n    updatedAt\n  }\n}"];
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
export function graphql(source: "query UserPage_GetUser($where: UserFilterInput) {\n  user(where: $where) {\n    id\n    username\n    createdAt\n    updatedAt\n  }\n}"): (typeof documents)["query UserPage_GetUser($where: UserFilterInput) {\n  user(where: $where) {\n    id\n    username\n    createdAt\n    updatedAt\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "subscription OnChatboxEvent($chatboxId: UUID!, $messagesFirst: Int) {\n  onChatboxEvent(chatboxId: $chatboxId) {\n    messages(first: $messagesFirst) {\n      edges {\n        node {\n          id\n          author {\n            username\n          }\n          content\n          createdAt\n        }\n      }\n    }\n  }\n}"): (typeof documents)["subscription OnChatboxEvent($chatboxId: UUID!, $messagesFirst: Int) {\n  onChatboxEvent(chatboxId: $chatboxId) {\n    messages(first: $messagesFirst) {\n      edges {\n        node {\n          id\n          author {\n            username\n          }\n          content\n          createdAt\n        }\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "subscription OnRaceEvent($raceId: UUID!, $racersFirst: Int) {\n  onRaceEvent(raceId: $raceId) {\n    id\n    mode\n    modeSetting\n    racers(first: $racersFirst) {\n      edges {\n        node {\n          id\n          user {\n            id\n            username\n          }\n          finished\n          wpm\n          wordsTyped\n        }\n      }\n    }\n    host {\n      id\n      username\n    }\n    started\n    running\n    finished\n    content\n    chatboxId\n    startTime\n  }\n}"): (typeof documents)["subscription OnRaceEvent($raceId: UUID!, $racersFirst: Int) {\n  onRaceEvent(raceId: $raceId) {\n    id\n    mode\n    modeSetting\n    racers(first: $racersFirst) {\n      edges {\n        node {\n          id\n          user {\n            id\n            username\n          }\n          finished\n          wpm\n          wordsTyped\n        }\n      }\n    }\n    host {\n      id\n      username\n    }\n    started\n    running\n    finished\n    content\n    chatboxId\n    startTime\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;