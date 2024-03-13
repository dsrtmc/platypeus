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
    "\n  query Login_Me {\n    me {\n      id\n      ...UserInfo\n    }\n  }\n": types.Login_MeDocument,
    "\n  mutation CreateRaceForm_CreateRace($input: CreateRaceInput!) {\n    createRace(input: $input) {\n      race {\n        id\n        unlisted\n        slug\n      }\n      errors {\n        code: __typename\n        ... on Error {\n          message\n        }\n      }\n    }\n  }\n": types.CreateRaceForm_CreateRaceDocument,
    "\n  query RaceList_GetRaces(\n    $after: String\n    $before: String\n    $racesFirst: Int\n    $racesLast: Int\n    $order: [RaceSortInput!]\n    $where: RaceFilterInput\n    $racersFirst: Int\n  ) {\n    races(after: $after, before: $before, first: $racesFirst, last: $racesLast, order: $order, where: $where) {\n      edges {\n        node {\n          id\n          createdAt\n          racers(first: $racersFirst) {\n            edges {\n              node {\n                user {\n                  username\n                }\n                wpm\n              }\n            }\n          }\n          host {\n            username\n          }\n          unlisted\n          slug\n          finished\n        }\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n": types.RaceList_GetRacesDocument,
    "\n  subscription Chatbox_OnChatboxEvent($chatboxId: UUID!, $messagesLast: Int) {\n    onChatboxEvent(chatboxId: $chatboxId) {\n      messages(last: $messagesLast) {\n        edges {\n          node {\n            id\n            author {\n              username\n            }\n            content\n            createdAt\n          }\n        }\n      }\n    }\n  }\n": types.Chatbox_OnChatboxEventDocument,
    "\n  mutation Chatbox_SendMessage($input: SendMessageInput!) {\n    sendMessage(input: $input) {\n      message {\n        content\n        chatbox {\n          id\n        }\n      }\n    }\n  }\n": types.Chatbox_SendMessageDocument,
    "\n  query RaceBox_Me {\n    me {\n      id\n      ...UserInfo\n    }\n  }\n": types.RaceBox_MeDocument,
    "\n  subscription RaceBox_OnRaceEvent($raceId: UUID!, $racersFirst: Int) {\n    onRaceEvent(raceId: $raceId) {\n      id\n      mode\n      modeSetting\n      racers(first: $racersFirst) {\n        edges {\n          node {\n            id\n            user {\n              id\n              username\n            }\n            finished\n            wpm\n            wordsTyped\n          }\n        }\n      }\n      host {\n        id\n        username\n      }\n      started\n      running\n      finished\n      content\n      chatboxId\n      startTime\n    }\n  }\n": types.RaceBox_OnRaceEventDocument,
    "\n  mutation RaceBox_FinishRaceForUser($input: FinishRaceForUserInput!) {\n    finishRaceForUser(input: $input) {\n      racer {\n        id\n        finished\n      }\n      errors {\n        code: __typename\n        ... on Error {\n          message\n        }\n      }\n    }\n  }\n": types.RaceBox_FinishRaceForUserDocument,
    "\n  mutation RaceBox_UpdateStats($input: UpdateStatsInput!) {\n    updateStats(input: $input) {\n      racer {\n        id\n      }\n      errors {\n        code: __typename\n        ... on Error {\n          message\n        }\n      }\n    }\n  }\n": types.RaceBox_UpdateStatsDocument,
    "\n  mutation RaceBox_FinishRace($input: FinishRaceInput!) {\n    finishRace(input: $input) {\n      race {\n        id\n      }\n      errors {\n        code: __typename\n        ... on Error {\n          message\n        }\n      }\n    }\n  }\n": types.RaceBox_FinishRaceDocument,
    "\n  mutation RaceBox_JoinRace($input: JoinRaceInput!) {\n    joinRace(input: $input) {\n      race {\n        id\n      }\n    }\n  }\n": types.RaceBox_JoinRaceDocument,
    "\n  mutation RaceBox_LeaveRace($input: LeaveRaceInput!) {\n    leaveRace(input: $input) {\n      race {\n        id\n      }\n    }\n  }\n": types.RaceBox_LeaveRaceDocument,
    "\n  mutation RaceBox_CreateScore($input: CreateScoreInput!) {\n    createScore(input: $input) {\n      score {\n        id\n        wpm\n        rawWpm\n        mode\n        modeSetting\n        content\n        language\n        user {\n          username\n        }\n      }\n    }\n  }\n": types.RaceBox_CreateScoreDocument,
    "\n  mutation RaceBox_StartRace($input: StartRaceInput!) {\n    startRace(input: $input) {\n      race {\n        started\n        running\n        updatedAt\n      }\n      errors {\n        code: __typename\n        ... on Error {\n          message\n        }\n      }\n    }\n  }\n": types.RaceBox_StartRaceDocument,
    "\n  mutation RaceBox_RunRace($input: RunRaceInput!) {\n    runRace(input: $input) {\n      race {\n        running\n      }\n      errors {\n        code: __typename\n        ... on Error {\n          message\n        }\n      }\n    }\n  }\n": types.RaceBox_RunRaceDocument,
    "\n  query RacePage_GetRace($where: RaceFilterInput, $racersFirst: Int!) {\n    race(where: $where) {\n      id\n      startTime\n      createdAt\n      racers(first: $racersFirst) {\n        edges {\n          node {\n            user {\n              username\n            }\n            wpm\n          }\n        }\n      }\n      host {\n        username\n      }\n      content\n      unlisted\n      running\n      finished\n    }\n  }\n": types.RacePage_GetRaceDocument,
    "\n  query RacesPage_Me {\n    me {\n      id\n      ...UserInfo\n    }\n  }\n": types.RacesPage_MeDocument,
    "\n  query ScorePage_GetScore($where: ScoreFilterInput) {\n    score(where: $where) {\n      id\n      wpm\n      rawWpm\n    }\n  }\n": types.ScorePage_GetScoreDocument,
    "\n  query UserPage_GetUsersBestScores($userId: UUID!, $mode: String!, $modeSettings: [Int!]!) {\n    usersBestScores(userId: $userId, mode: $mode, modeSettings: $modeSettings) {\n      wpm\n      rawWpm\n      mode\n      modeSetting\n      accuracy\n      createdAt\n    }\n  }\n": types.UserPage_GetUsersBestScoresDocument,
    "\n  query UserPage_GetUser($where: UserFilterInput) {\n    user(where: $where) {\n      id\n      username\n      averageWpm\n      scoreCount\n      createdAt\n    }\n  }\n": types.UserPage_GetUserDocument,
    "\n  query UserPage_GetUserMonthlyScoreSummaries($userId: UUID!) {\n    userMonthlyScoreSummaries(userId: $userId) {\n      wpm\n      rawWpm\n      accuracy\n      date\n    }\n  }\n": types.UserPage_GetUserMonthlyScoreSummariesDocument,
    "\n  mutation LoginForm_Login($input: LoginInput!) {\n    login(input: $input) {\n      user {\n        id\n        ...UserInfo\n      }\n      errors {\n        code: __typename\n        ... on Error {\n          message\n        }\n      }\n    }\n  }\n": types.LoginForm_LoginDocument,
    "\n  mutation RegisterForm_Register($input: RegisterInput!) {\n    register(input: $input) {\n      user {\n        ...UserInfo\n      }\n      errors {\n        code: __typename\n        ... on Error {\n          message\n        }\n      }\n    }\n  }\n": types.RegisterForm_RegisterDocument,
    "\n  query Leaderboard_GetScoresForLeaderboard(\n    $after: String\n    $before: String\n    $first: Int\n    $last: Int\n    $mode: String!\n    $modeSetting: Int!\n  ) {\n    scoresForLeaderboard(\n      after: $after\n      before: $before\n      first: $first\n      last: $last\n      mode: $mode\n      modeSetting: $modeSetting\n    ) {\n      edges {\n        node {\n          id\n          wpm\n          rawWpm\n          accuracy\n          user {\n            username\n          }\n          mode\n          modeSetting\n          content\n          createdAt\n        }\n        cursor\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n": types.Leaderboard_GetScoresForLeaderboardDocument,
    "\n  mutation AuthBox_Logout {\n    logout {\n      boolean\n    }\n  }\n": types.AuthBox_LogoutDocument,
    "\n  query Navbar_Me {\n    me {\n      id\n      ...UserInfo\n    }\n  }\n": types.Navbar_MeDocument,
    "\n  fragment ScoreInfo on Score {\n    wpm\n    rawWpm\n    mode\n    modeSetting\n    content\n    language\n    accuracy\n    wpmStats\n    rawStats\n    user {\n      username\n    }\n  }\n": types.ScoreInfoFragmentDoc,
    "\n  mutation MainBox_CreateScore($input: CreateScoreInput!) {\n    createScore(input: $input) {\n      score {\n        id\n        ...ScoreInfo\n      }\n    }\n  }\n": types.MainBox_CreateScoreDocument,
    "fragment UserInfo on User {\n  username\n  email\n}": types.UserInfoFragmentDoc,
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
export function graphql(source: "\n  query Login_Me {\n    me {\n      id\n      ...UserInfo\n    }\n  }\n"): (typeof documents)["\n  query Login_Me {\n    me {\n      id\n      ...UserInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateRaceForm_CreateRace($input: CreateRaceInput!) {\n    createRace(input: $input) {\n      race {\n        id\n        unlisted\n        slug\n      }\n      errors {\n        code: __typename\n        ... on Error {\n          message\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateRaceForm_CreateRace($input: CreateRaceInput!) {\n    createRace(input: $input) {\n      race {\n        id\n        unlisted\n        slug\n      }\n      errors {\n        code: __typename\n        ... on Error {\n          message\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query RaceList_GetRaces(\n    $after: String\n    $before: String\n    $racesFirst: Int\n    $racesLast: Int\n    $order: [RaceSortInput!]\n    $where: RaceFilterInput\n    $racersFirst: Int\n  ) {\n    races(after: $after, before: $before, first: $racesFirst, last: $racesLast, order: $order, where: $where) {\n      edges {\n        node {\n          id\n          createdAt\n          racers(first: $racersFirst) {\n            edges {\n              node {\n                user {\n                  username\n                }\n                wpm\n              }\n            }\n          }\n          host {\n            username\n          }\n          unlisted\n          slug\n          finished\n        }\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n"): (typeof documents)["\n  query RaceList_GetRaces(\n    $after: String\n    $before: String\n    $racesFirst: Int\n    $racesLast: Int\n    $order: [RaceSortInput!]\n    $where: RaceFilterInput\n    $racersFirst: Int\n  ) {\n    races(after: $after, before: $before, first: $racesFirst, last: $racesLast, order: $order, where: $where) {\n      edges {\n        node {\n          id\n          createdAt\n          racers(first: $racersFirst) {\n            edges {\n              node {\n                user {\n                  username\n                }\n                wpm\n              }\n            }\n          }\n          host {\n            username\n          }\n          unlisted\n          slug\n          finished\n        }\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription Chatbox_OnChatboxEvent($chatboxId: UUID!, $messagesLast: Int) {\n    onChatboxEvent(chatboxId: $chatboxId) {\n      messages(last: $messagesLast) {\n        edges {\n          node {\n            id\n            author {\n              username\n            }\n            content\n            createdAt\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription Chatbox_OnChatboxEvent($chatboxId: UUID!, $messagesLast: Int) {\n    onChatboxEvent(chatboxId: $chatboxId) {\n      messages(last: $messagesLast) {\n        edges {\n          node {\n            id\n            author {\n              username\n            }\n            content\n            createdAt\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Chatbox_SendMessage($input: SendMessageInput!) {\n    sendMessage(input: $input) {\n      message {\n        content\n        chatbox {\n          id\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Chatbox_SendMessage($input: SendMessageInput!) {\n    sendMessage(input: $input) {\n      message {\n        content\n        chatbox {\n          id\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query RaceBox_Me {\n    me {\n      id\n      ...UserInfo\n    }\n  }\n"): (typeof documents)["\n  query RaceBox_Me {\n    me {\n      id\n      ...UserInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription RaceBox_OnRaceEvent($raceId: UUID!, $racersFirst: Int) {\n    onRaceEvent(raceId: $raceId) {\n      id\n      mode\n      modeSetting\n      racers(first: $racersFirst) {\n        edges {\n          node {\n            id\n            user {\n              id\n              username\n            }\n            finished\n            wpm\n            wordsTyped\n          }\n        }\n      }\n      host {\n        id\n        username\n      }\n      started\n      running\n      finished\n      content\n      chatboxId\n      startTime\n    }\n  }\n"): (typeof documents)["\n  subscription RaceBox_OnRaceEvent($raceId: UUID!, $racersFirst: Int) {\n    onRaceEvent(raceId: $raceId) {\n      id\n      mode\n      modeSetting\n      racers(first: $racersFirst) {\n        edges {\n          node {\n            id\n            user {\n              id\n              username\n            }\n            finished\n            wpm\n            wordsTyped\n          }\n        }\n      }\n      host {\n        id\n        username\n      }\n      started\n      running\n      finished\n      content\n      chatboxId\n      startTime\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RaceBox_FinishRaceForUser($input: FinishRaceForUserInput!) {\n    finishRaceForUser(input: $input) {\n      racer {\n        id\n        finished\n      }\n      errors {\n        code: __typename\n        ... on Error {\n          message\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation RaceBox_FinishRaceForUser($input: FinishRaceForUserInput!) {\n    finishRaceForUser(input: $input) {\n      racer {\n        id\n        finished\n      }\n      errors {\n        code: __typename\n        ... on Error {\n          message\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RaceBox_UpdateStats($input: UpdateStatsInput!) {\n    updateStats(input: $input) {\n      racer {\n        id\n      }\n      errors {\n        code: __typename\n        ... on Error {\n          message\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation RaceBox_UpdateStats($input: UpdateStatsInput!) {\n    updateStats(input: $input) {\n      racer {\n        id\n      }\n      errors {\n        code: __typename\n        ... on Error {\n          message\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RaceBox_FinishRace($input: FinishRaceInput!) {\n    finishRace(input: $input) {\n      race {\n        id\n      }\n      errors {\n        code: __typename\n        ... on Error {\n          message\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation RaceBox_FinishRace($input: FinishRaceInput!) {\n    finishRace(input: $input) {\n      race {\n        id\n      }\n      errors {\n        code: __typename\n        ... on Error {\n          message\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RaceBox_JoinRace($input: JoinRaceInput!) {\n    joinRace(input: $input) {\n      race {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation RaceBox_JoinRace($input: JoinRaceInput!) {\n    joinRace(input: $input) {\n      race {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RaceBox_LeaveRace($input: LeaveRaceInput!) {\n    leaveRace(input: $input) {\n      race {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation RaceBox_LeaveRace($input: LeaveRaceInput!) {\n    leaveRace(input: $input) {\n      race {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RaceBox_CreateScore($input: CreateScoreInput!) {\n    createScore(input: $input) {\n      score {\n        id\n        wpm\n        rawWpm\n        mode\n        modeSetting\n        content\n        language\n        user {\n          username\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation RaceBox_CreateScore($input: CreateScoreInput!) {\n    createScore(input: $input) {\n      score {\n        id\n        wpm\n        rawWpm\n        mode\n        modeSetting\n        content\n        language\n        user {\n          username\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RaceBox_StartRace($input: StartRaceInput!) {\n    startRace(input: $input) {\n      race {\n        started\n        running\n        updatedAt\n      }\n      errors {\n        code: __typename\n        ... on Error {\n          message\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation RaceBox_StartRace($input: StartRaceInput!) {\n    startRace(input: $input) {\n      race {\n        started\n        running\n        updatedAt\n      }\n      errors {\n        code: __typename\n        ... on Error {\n          message\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RaceBox_RunRace($input: RunRaceInput!) {\n    runRace(input: $input) {\n      race {\n        running\n      }\n      errors {\n        code: __typename\n        ... on Error {\n          message\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation RaceBox_RunRace($input: RunRaceInput!) {\n    runRace(input: $input) {\n      race {\n        running\n      }\n      errors {\n        code: __typename\n        ... on Error {\n          message\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query RacePage_GetRace($where: RaceFilterInput, $racersFirst: Int!) {\n    race(where: $where) {\n      id\n      startTime\n      createdAt\n      racers(first: $racersFirst) {\n        edges {\n          node {\n            user {\n              username\n            }\n            wpm\n          }\n        }\n      }\n      host {\n        username\n      }\n      content\n      unlisted\n      running\n      finished\n    }\n  }\n"): (typeof documents)["\n  query RacePage_GetRace($where: RaceFilterInput, $racersFirst: Int!) {\n    race(where: $where) {\n      id\n      startTime\n      createdAt\n      racers(first: $racersFirst) {\n        edges {\n          node {\n            user {\n              username\n            }\n            wpm\n          }\n        }\n      }\n      host {\n        username\n      }\n      content\n      unlisted\n      running\n      finished\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query RacesPage_Me {\n    me {\n      id\n      ...UserInfo\n    }\n  }\n"): (typeof documents)["\n  query RacesPage_Me {\n    me {\n      id\n      ...UserInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ScorePage_GetScore($where: ScoreFilterInput) {\n    score(where: $where) {\n      id\n      wpm\n      rawWpm\n    }\n  }\n"): (typeof documents)["\n  query ScorePage_GetScore($where: ScoreFilterInput) {\n    score(where: $where) {\n      id\n      wpm\n      rawWpm\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query UserPage_GetUsersBestScores($userId: UUID!, $mode: String!, $modeSettings: [Int!]!) {\n    usersBestScores(userId: $userId, mode: $mode, modeSettings: $modeSettings) {\n      wpm\n      rawWpm\n      mode\n      modeSetting\n      accuracy\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query UserPage_GetUsersBestScores($userId: UUID!, $mode: String!, $modeSettings: [Int!]!) {\n    usersBestScores(userId: $userId, mode: $mode, modeSettings: $modeSettings) {\n      wpm\n      rawWpm\n      mode\n      modeSetting\n      accuracy\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query UserPage_GetUser($where: UserFilterInput) {\n    user(where: $where) {\n      id\n      username\n      averageWpm\n      scoreCount\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query UserPage_GetUser($where: UserFilterInput) {\n    user(where: $where) {\n      id\n      username\n      averageWpm\n      scoreCount\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query UserPage_GetUserMonthlyScoreSummaries($userId: UUID!) {\n    userMonthlyScoreSummaries(userId: $userId) {\n      wpm\n      rawWpm\n      accuracy\n      date\n    }\n  }\n"): (typeof documents)["\n  query UserPage_GetUserMonthlyScoreSummaries($userId: UUID!) {\n    userMonthlyScoreSummaries(userId: $userId) {\n      wpm\n      rawWpm\n      accuracy\n      date\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation LoginForm_Login($input: LoginInput!) {\n    login(input: $input) {\n      user {\n        id\n        ...UserInfo\n      }\n      errors {\n        code: __typename\n        ... on Error {\n          message\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation LoginForm_Login($input: LoginInput!) {\n    login(input: $input) {\n      user {\n        id\n        ...UserInfo\n      }\n      errors {\n        code: __typename\n        ... on Error {\n          message\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RegisterForm_Register($input: RegisterInput!) {\n    register(input: $input) {\n      user {\n        ...UserInfo\n      }\n      errors {\n        code: __typename\n        ... on Error {\n          message\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation RegisterForm_Register($input: RegisterInput!) {\n    register(input: $input) {\n      user {\n        ...UserInfo\n      }\n      errors {\n        code: __typename\n        ... on Error {\n          message\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Leaderboard_GetScoresForLeaderboard(\n    $after: String\n    $before: String\n    $first: Int\n    $last: Int\n    $mode: String!\n    $modeSetting: Int!\n  ) {\n    scoresForLeaderboard(\n      after: $after\n      before: $before\n      first: $first\n      last: $last\n      mode: $mode\n      modeSetting: $modeSetting\n    ) {\n      edges {\n        node {\n          id\n          wpm\n          rawWpm\n          accuracy\n          user {\n            username\n          }\n          mode\n          modeSetting\n          content\n          createdAt\n        }\n        cursor\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n"): (typeof documents)["\n  query Leaderboard_GetScoresForLeaderboard(\n    $after: String\n    $before: String\n    $first: Int\n    $last: Int\n    $mode: String!\n    $modeSetting: Int!\n  ) {\n    scoresForLeaderboard(\n      after: $after\n      before: $before\n      first: $first\n      last: $last\n      mode: $mode\n      modeSetting: $modeSetting\n    ) {\n      edges {\n        node {\n          id\n          wpm\n          rawWpm\n          accuracy\n          user {\n            username\n          }\n          mode\n          modeSetting\n          content\n          createdAt\n        }\n        cursor\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AuthBox_Logout {\n    logout {\n      boolean\n    }\n  }\n"): (typeof documents)["\n  mutation AuthBox_Logout {\n    logout {\n      boolean\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Navbar_Me {\n    me {\n      id\n      ...UserInfo\n    }\n  }\n"): (typeof documents)["\n  query Navbar_Me {\n    me {\n      id\n      ...UserInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ScoreInfo on Score {\n    wpm\n    rawWpm\n    mode\n    modeSetting\n    content\n    language\n    accuracy\n    wpmStats\n    rawStats\n    user {\n      username\n    }\n  }\n"): (typeof documents)["\n  fragment ScoreInfo on Score {\n    wpm\n    rawWpm\n    mode\n    modeSetting\n    content\n    language\n    accuracy\n    wpmStats\n    rawStats\n    user {\n      username\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation MainBox_CreateScore($input: CreateScoreInput!) {\n    createScore(input: $input) {\n      score {\n        id\n        ...ScoreInfo\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation MainBox_CreateScore($input: CreateScoreInput!) {\n    createScore(input: $input) {\n      score {\n        id\n        ...ScoreInfo\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment UserInfo on User {\n  username\n  email\n}"): (typeof documents)["fragment UserInfo on User {\n  username\n  email\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;