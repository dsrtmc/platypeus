/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
  DateTime: { input: any; output: any; }
  /** The multiplier path scalar represents a valid GraphQL multiplier path string. */
  MultiplierPath: { input: any; output: any; }
  UUID: { input: any; output: any; }
};

export type AlreadyJoinedRaceError = Error & {
  __typename?: 'AlreadyJoinedRaceError';
  message: Scalars['String']['output'];
};

export enum ApplyPolicy {
  AfterResolver = 'AFTER_RESOLVER',
  BeforeResolver = 'BEFORE_RESOLVER',
  Validation = 'VALIDATION'
}

export type BooleanOperationFilterInput = {
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  neq?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Chatbox = {
  __typename?: 'Chatbox';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['UUID']['output'];
  messages?: Maybe<MessagesConnection>;
  updatedAt: Scalars['DateTime']['output'];
};


export type ChatboxMessagesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type ChatboxFilterInput = {
  and?: InputMaybe<Array<ChatboxFilterInput>>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  messages?: InputMaybe<ListFilterInputTypeOfMessageFilterInput>;
  or?: InputMaybe<Array<ChatboxFilterInput>>;
  updatedAt?: InputMaybe<DateTimeOperationFilterInput>;
};

export type ChatboxSortInput = {
  createdAt?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  updatedAt?: InputMaybe<SortEnumType>;
};

/** A connection to a list of items. */
export type ChatboxesConnection = {
  __typename?: 'ChatboxesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ChatboxesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Chatbox>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type ChatboxesEdge = {
  __typename?: 'ChatboxesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Chatbox;
};

export type CreateChatboxPayload = {
  __typename?: 'CreateChatboxPayload';
  chatbox?: Maybe<Chatbox>;
};

export type CreateRaceError = NotAuthenticatedError;

export type CreateRaceInput = {
  content: Scalars['String']['input'];
  mode: Scalars['String']['input'];
  modeSetting: Scalars['Int']['input'];
  unlisted: Scalars['Boolean']['input'];
};

export type CreateRacePayload = {
  __typename?: 'CreateRacePayload';
  errors?: Maybe<Array<CreateRaceError>>;
  race?: Maybe<Race>;
};

export type CreateScoreInput = {
  accuracy: Scalars['Float']['input'];
  content: Scalars['String']['input'];
  language: Scalars['String']['input'];
  mode: Scalars['String']['input'];
  modeSetting: Scalars['Int']['input'];
  rawStats: Array<Scalars['Int']['input']>;
  rawWpm: Scalars['Int']['input'];
  wpm: Scalars['Int']['input'];
  wpmStats: Array<Scalars['Int']['input']>;
};

export type CreateScorePayload = {
  __typename?: 'CreateScorePayload';
  score?: Maybe<Score>;
};

export type DateTimeOperationFilterInput = {
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  neq?: InputMaybe<Scalars['DateTime']['input']>;
  ngt?: InputMaybe<Scalars['DateTime']['input']>;
  ngte?: InputMaybe<Scalars['DateTime']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  nlt?: InputMaybe<Scalars['DateTime']['input']>;
  nlte?: InputMaybe<Scalars['DateTime']['input']>;
};

export type DeleteUserInput = {
  userId: Scalars['UUID']['input'];
};

export type DeleteUserPayload = {
  __typename?: 'DeleteUserPayload';
  boolean?: Maybe<Scalars['Boolean']['output']>;
};

export type Error = {
  message: Scalars['String']['output'];
};

export type FinishRaceError = InvalidRaceError;

export type FinishRaceForUserError = InvalidRaceError | InvalidRacerError | InvalidUserError;

export type FinishRaceForUserInput = {
  raceId: Scalars['UUID']['input'];
  userId: Scalars['UUID']['input'];
};

export type FinishRaceForUserPayload = {
  __typename?: 'FinishRaceForUserPayload';
  errors?: Maybe<Array<FinishRaceForUserError>>;
  racer?: Maybe<Racer>;
};

export type FinishRaceInput = {
  raceId: Scalars['UUID']['input'];
};

export type FinishRacePayload = {
  __typename?: 'FinishRacePayload';
  errors?: Maybe<Array<FinishRaceError>>;
  race?: Maybe<Race>;
};

export type FloatOperationFilterInput = {
  eq?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  neq?: InputMaybe<Scalars['Float']['input']>;
  ngt?: InputMaybe<Scalars['Float']['input']>;
  ngte?: InputMaybe<Scalars['Float']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  nlt?: InputMaybe<Scalars['Float']['input']>;
  nlte?: InputMaybe<Scalars['Float']['input']>;
};

export type IncorrectCredentialsError = Error & {
  __typename?: 'IncorrectCredentialsError';
  message: Scalars['String']['output'];
};

export type IntOperationFilterInput = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  neq?: InputMaybe<Scalars['Int']['input']>;
  ngt?: InputMaybe<Scalars['Int']['input']>;
  ngte?: InputMaybe<Scalars['Int']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  nlt?: InputMaybe<Scalars['Int']['input']>;
  nlte?: InputMaybe<Scalars['Int']['input']>;
};

export type InvalidChatboxError = Error & {
  __typename?: 'InvalidChatboxError';
  message: Scalars['String']['output'];
};

export type InvalidFieldError = Error & {
  __typename?: 'InvalidFieldError';
  message: Scalars['String']['output'];
};

export type InvalidRaceError = Error & {
  __typename?: 'InvalidRaceError';
  message: Scalars['String']['output'];
};

export type InvalidRacerError = Error & {
  __typename?: 'InvalidRacerError';
  message: Scalars['String']['output'];
};

export type InvalidUserError = Error & {
  __typename?: 'InvalidUserError';
  message: Scalars['String']['output'];
};

export type JoinChatboxError = InvalidChatboxError | InvalidUserError;

export type JoinChatboxInput = {
  chatboxId: Scalars['UUID']['input'];
  userId: Scalars['UUID']['input'];
};

export type JoinChatboxPayload = {
  __typename?: 'JoinChatboxPayload';
  chatbox?: Maybe<Chatbox>;
  errors?: Maybe<Array<JoinChatboxError>>;
};

export type JoinRaceError = AlreadyJoinedRaceError | InvalidRaceError | NotAuthenticatedError | RaceAlreadyRunningError;

export type JoinRaceInput = {
  raceId?: InputMaybe<Scalars['UUID']['input']>;
};

export type JoinRacePayload = {
  __typename?: 'JoinRacePayload';
  errors?: Maybe<Array<JoinRaceError>>;
  race?: Maybe<Race>;
};

export type LeaveRaceError = InvalidRaceError | NotAuthenticatedError | NotInRaceError | RaceIsRunningError;

export type LeaveRaceInput = {
  raceId: Scalars['UUID']['input'];
};

export type LeaveRacePayload = {
  __typename?: 'LeaveRacePayload';
  errors?: Maybe<Array<LeaveRaceError>>;
  race?: Maybe<Race>;
};

export type ListFilterInputTypeOfMessageFilterInput = {
  all?: InputMaybe<MessageFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<MessageFilterInput>;
  some?: InputMaybe<MessageFilterInput>;
};

export type ListFilterInputTypeOfRacerFilterInput = {
  all?: InputMaybe<RacerFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<RacerFilterInput>;
  some?: InputMaybe<RacerFilterInput>;
};

export type ListFilterInputTypeOfScoreFilterInput = {
  all?: InputMaybe<ScoreFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<ScoreFilterInput>;
  some?: InputMaybe<ScoreFilterInput>;
};

export type ListIntOperationFilterInput = {
  all?: InputMaybe<IntOperationFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<IntOperationFilterInput>;
  some?: InputMaybe<IntOperationFilterInput>;
};

export type LoginError = IncorrectCredentialsError | InvalidFieldError;

export type LoginInput = {
  password?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type LoginPayload = {
  __typename?: 'LoginPayload';
  errors?: Maybe<Array<LoginError>>;
  user?: Maybe<User>;
};

export type LogoutPayload = {
  __typename?: 'LogoutPayload';
  boolean?: Maybe<Scalars['Boolean']['output']>;
};

export type Message = {
  __typename?: 'Message';
  author: User;
  chatbox: Chatbox;
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['UUID']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type MessageFilterInput = {
  and?: InputMaybe<Array<MessageFilterInput>>;
  author?: InputMaybe<UserFilterInput>;
  chatbox?: InputMaybe<ChatboxFilterInput>;
  content?: InputMaybe<StringOperationFilterInput>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  or?: InputMaybe<Array<MessageFilterInput>>;
  updatedAt?: InputMaybe<DateTimeOperationFilterInput>;
};

export type MessageSortInput = {
  author?: InputMaybe<UserSortInput>;
  chatbox?: InputMaybe<ChatboxSortInput>;
  content?: InputMaybe<SortEnumType>;
  createdAt?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  updatedAt?: InputMaybe<SortEnumType>;
};

/** A connection to a list of items. */
export type MessagesConnection = {
  __typename?: 'MessagesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<MessagesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Message>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type MessagesEdge = {
  __typename?: 'MessagesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Message;
};

export type Mutation = {
  __typename?: 'Mutation';
  createChatbox: CreateChatboxPayload;
  createRace: CreateRacePayload;
  createScore: CreateScorePayload;
  deleteUser: DeleteUserPayload;
  finishRace: FinishRacePayload;
  finishRaceForUser: FinishRaceForUserPayload;
  joinChatbox: JoinChatboxPayload;
  joinRace: JoinRacePayload;
  leaveRace: LeaveRacePayload;
  login: LoginPayload;
  logout: LogoutPayload;
  register: RegisterPayload;
  runRace: RunRacePayload;
  sendMessage: SendMessagePayload;
  startRace: StartRacePayload;
  updateStatsForUser: UpdateStatsForUserPayload;
};


export type MutationCreateRaceArgs = {
  input: CreateRaceInput;
};


export type MutationCreateScoreArgs = {
  input: CreateScoreInput;
};


export type MutationDeleteUserArgs = {
  input: DeleteUserInput;
};


export type MutationFinishRaceArgs = {
  input: FinishRaceInput;
};


export type MutationFinishRaceForUserArgs = {
  input: FinishRaceForUserInput;
};


export type MutationJoinChatboxArgs = {
  input: JoinChatboxInput;
};


export type MutationJoinRaceArgs = {
  input: JoinRaceInput;
};


export type MutationLeaveRaceArgs = {
  input: LeaveRaceInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationRunRaceArgs = {
  input: RunRaceInput;
};


export type MutationSendMessageArgs = {
  input: SendMessageInput;
};


export type MutationStartRaceArgs = {
  input: StartRaceInput;
};


export type MutationUpdateStatsForUserArgs = {
  input: UpdateStatsForUserInput;
};

export type NotAuthenticatedError = Error & {
  __typename?: 'NotAuthenticatedError';
  message: Scalars['String']['output'];
};

export type NotAuthorizedError = Error & {
  __typename?: 'NotAuthorizedError';
  message: Scalars['String']['output'];
};

export type NotInRaceError = Error & {
  __typename?: 'NotInRaceError';
  message: Scalars['String']['output'];
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** Indicates whether more edges exist following the set defined by the clients arguments. */
  hasNextPage: Scalars['Boolean']['output'];
  /** Indicates whether more edges exist prior the set defined by the clients arguments. */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  bye: Scalars['String']['output'];
  chatboxes?: Maybe<ChatboxesConnection>;
  hello: Scalars['String']['output'];
  me?: Maybe<User>;
  messages?: Maybe<MessagesConnection>;
  race?: Maybe<Race>;
  races?: Maybe<RacesConnection>;
  score?: Maybe<Score>;
  scores?: Maybe<ScoresConnection>;
  scoresForLeaderboard?: Maybe<ScoresForLeaderboardConnection>;
  user?: Maybe<User>;
  userMonthlyScoreSummaries: Array<Maybe<UserMonthlySummary>>;
  users?: Maybe<UsersConnection>;
  usersBestScores: Array<Maybe<Score>>;
};


export type QueryChatboxesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<ChatboxSortInput>>;
  where?: InputMaybe<ChatboxFilterInput>;
};


export type QueryMessagesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<MessageSortInput>>;
  where?: InputMaybe<MessageFilterInput>;
};


export type QueryRaceArgs = {
  where?: InputMaybe<RaceFilterInput>;
};


export type QueryRacesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<RaceSortInput>>;
  where?: InputMaybe<RaceFilterInput>;
};


export type QueryScoreArgs = {
  where?: InputMaybe<ScoreFilterInput>;
};


export type QueryScoresArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<ScoreSortInput>>;
  where?: InputMaybe<ScoreFilterInput>;
};


export type QueryScoresForLeaderboardArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  mode: Scalars['String']['input'];
  modeSetting: Scalars['Int']['input'];
};


export type QueryUserArgs = {
  where?: InputMaybe<UserFilterInput>;
};


export type QueryUserMonthlyScoreSummariesArgs = {
  userId: Scalars['UUID']['input'];
};


export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<UserSortInput>>;
  where?: InputMaybe<UserFilterInput>;
};


export type QueryUsersBestScoresArgs = {
  mode: Scalars['String']['input'];
  modeSettings: Array<Scalars['Int']['input']>;
  userId: Scalars['UUID']['input'];
};

export type Race = {
  __typename?: 'Race';
  chatbox: Chatbox;
  chatboxId: Scalars['UUID']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  finished: Scalars['Boolean']['output'];
  host: User;
  id: Scalars['UUID']['output'];
  mode: Scalars['String']['output'];
  modeSetting: Scalars['Int']['output'];
  racers?: Maybe<RacersConnection>;
  running: Scalars['Boolean']['output'];
  slug: Scalars['String']['output'];
  startTime?: Maybe<Scalars['DateTime']['output']>;
  started: Scalars['Boolean']['output'];
  unlisted: Scalars['Boolean']['output'];
  updatedAt: Scalars['DateTime']['output'];
};


export type RaceRacersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type RaceAlreadyRunningError = Error & {
  __typename?: 'RaceAlreadyRunningError';
  message: Scalars['String']['output'];
};

export type RaceFilterInput = {
  and?: InputMaybe<Array<RaceFilterInput>>;
  chatbox?: InputMaybe<ChatboxFilterInput>;
  chatboxId?: InputMaybe<UuidOperationFilterInput>;
  content?: InputMaybe<StringOperationFilterInput>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  finished?: InputMaybe<BooleanOperationFilterInput>;
  host?: InputMaybe<UserFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  mode?: InputMaybe<StringOperationFilterInput>;
  modeSetting?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<RaceFilterInput>>;
  racers?: InputMaybe<ListFilterInputTypeOfRacerFilterInput>;
  running?: InputMaybe<BooleanOperationFilterInput>;
  slug?: InputMaybe<StringOperationFilterInput>;
  startTime?: InputMaybe<DateTimeOperationFilterInput>;
  started?: InputMaybe<BooleanOperationFilterInput>;
  unlisted?: InputMaybe<BooleanOperationFilterInput>;
  updatedAt?: InputMaybe<DateTimeOperationFilterInput>;
};

export type RaceIsRunningError = Error & {
  __typename?: 'RaceIsRunningError';
  message: Scalars['String']['output'];
};

export type RaceSortInput = {
  chatbox?: InputMaybe<ChatboxSortInput>;
  chatboxId?: InputMaybe<SortEnumType>;
  content?: InputMaybe<SortEnumType>;
  createdAt?: InputMaybe<SortEnumType>;
  finished?: InputMaybe<SortEnumType>;
  host?: InputMaybe<UserSortInput>;
  id?: InputMaybe<SortEnumType>;
  mode?: InputMaybe<SortEnumType>;
  modeSetting?: InputMaybe<SortEnumType>;
  running?: InputMaybe<SortEnumType>;
  slug?: InputMaybe<SortEnumType>;
  startTime?: InputMaybe<SortEnumType>;
  started?: InputMaybe<SortEnumType>;
  unlisted?: InputMaybe<SortEnumType>;
  updatedAt?: InputMaybe<SortEnumType>;
};

export type Racer = {
  __typename?: 'Racer';
  createdAt: Scalars['DateTime']['output'];
  finished: Scalars['Boolean']['output'];
  id: Scalars['UUID']['output'];
  race: Race;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  wordsTyped: Scalars['Int']['output'];
  wpm: Scalars['Int']['output'];
};

export type RacerFilterInput = {
  and?: InputMaybe<Array<RacerFilterInput>>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  finished?: InputMaybe<BooleanOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  or?: InputMaybe<Array<RacerFilterInput>>;
  race?: InputMaybe<RaceFilterInput>;
  updatedAt?: InputMaybe<DateTimeOperationFilterInput>;
  user?: InputMaybe<UserFilterInput>;
  wordsTyped?: InputMaybe<IntOperationFilterInput>;
  wpm?: InputMaybe<IntOperationFilterInput>;
};

/** A connection to a list of items. */
export type RacersConnection = {
  __typename?: 'RacersConnection';
  /** A list of edges. */
  edges?: Maybe<Array<RacersEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Racer>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type RacersEdge = {
  __typename?: 'RacersEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Racer;
};

/** A connection to a list of items. */
export type RacesConnection = {
  __typename?: 'RacesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<RacesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Race>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type RacesEdge = {
  __typename?: 'RacesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Race;
};

export type RegisterError = InvalidFieldError | UsernameTakenError;

export type RegisterInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type RegisterPayload = {
  __typename?: 'RegisterPayload';
  errors?: Maybe<Array<RegisterError>>;
  user?: Maybe<User>;
};

export type RunRaceError = InvalidRaceError | NotAuthenticatedError | NotAuthorizedError;

export type RunRaceInput = {
  raceId: Scalars['UUID']['input'];
};

export type RunRacePayload = {
  __typename?: 'RunRacePayload';
  errors?: Maybe<Array<RunRaceError>>;
  race?: Maybe<Race>;
};

export type Score = {
  __typename?: 'Score';
  accuracy: Scalars['Float']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['UUID']['output'];
  language: Scalars['String']['output'];
  mode: Scalars['String']['output'];
  modeSetting: Scalars['Int']['output'];
  rawStats: Array<Scalars['Int']['output']>;
  rawWpm: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<User>;
  userId?: Maybe<Scalars['UUID']['output']>;
  wpm: Scalars['Int']['output'];
  wpmStats: Array<Scalars['Int']['output']>;
};

export type ScoreFilterInput = {
  accuracy?: InputMaybe<FloatOperationFilterInput>;
  and?: InputMaybe<Array<ScoreFilterInput>>;
  content?: InputMaybe<StringOperationFilterInput>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  language?: InputMaybe<StringOperationFilterInput>;
  mode?: InputMaybe<StringOperationFilterInput>;
  modeSetting?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<ScoreFilterInput>>;
  rawStats?: InputMaybe<ListIntOperationFilterInput>;
  rawWpm?: InputMaybe<IntOperationFilterInput>;
  updatedAt?: InputMaybe<DateTimeOperationFilterInput>;
  user?: InputMaybe<UserFilterInput>;
  userId?: InputMaybe<UuidOperationFilterInput>;
  wpm?: InputMaybe<IntOperationFilterInput>;
  wpmStats?: InputMaybe<ListIntOperationFilterInput>;
};

export type ScoreSortInput = {
  accuracy?: InputMaybe<SortEnumType>;
  content?: InputMaybe<SortEnumType>;
  createdAt?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  language?: InputMaybe<SortEnumType>;
  mode?: InputMaybe<SortEnumType>;
  modeSetting?: InputMaybe<SortEnumType>;
  rawWpm?: InputMaybe<SortEnumType>;
  updatedAt?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UserSortInput>;
  userId?: InputMaybe<SortEnumType>;
  wpm?: InputMaybe<SortEnumType>;
};

/** A connection to a list of items. */
export type ScoresConnection = {
  __typename?: 'ScoresConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ScoresEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Score>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type ScoresEdge = {
  __typename?: 'ScoresEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Score;
};

/** A connection to a list of items. */
export type ScoresForLeaderboardConnection = {
  __typename?: 'ScoresForLeaderboardConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ScoresForLeaderboardEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Score>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type ScoresForLeaderboardEdge = {
  __typename?: 'ScoresForLeaderboardEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Score;
};

export type SendMessageError = InvalidChatboxError | NotAuthenticatedError;

export type SendMessageInput = {
  chatboxId: Scalars['UUID']['input'];
  content: Scalars['String']['input'];
};

export type SendMessagePayload = {
  __typename?: 'SendMessagePayload';
  errors?: Maybe<Array<SendMessageError>>;
  message?: Maybe<Message>;
};

export enum SortEnumType {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type StartRaceError = InvalidRaceError | NotAuthenticatedError | NotAuthorizedError | RaceAlreadyRunningError | TooFewRacersError;

export type StartRaceInput = {
  raceId: Scalars['UUID']['input'];
};

export type StartRacePayload = {
  __typename?: 'StartRacePayload';
  errors?: Maybe<Array<StartRaceError>>;
  race?: Maybe<Race>;
};

export type StringOperationFilterInput = {
  and?: InputMaybe<Array<StringOperationFilterInput>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ncontains?: InputMaybe<Scalars['String']['input']>;
  nendsWith?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  nstartsWith?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<StringOperationFilterInput>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  onChatboxEvent: Chatbox;
  onRaceEvent: Race;
};


export type SubscriptionOnChatboxEventArgs = {
  chatboxId: Scalars['UUID']['input'];
};


export type SubscriptionOnRaceEventArgs = {
  raceId: Scalars['UUID']['input'];
};

export type TooFewRacersError = Error & {
  __typename?: 'TooFewRacersError';
  message: Scalars['String']['output'];
};

export type UpdateStatsForUserError = InvalidRaceError | InvalidRacerError | InvalidUserError;

export type UpdateStatsForUserInput = {
  raceId: Scalars['UUID']['input'];
  userId: Scalars['UUID']['input'];
  wordsTyped: Scalars['Int']['input'];
  wpm: Scalars['Int']['input'];
};

export type UpdateStatsForUserPayload = {
  __typename?: 'UpdateStatsForUserPayload';
  errors?: Maybe<Array<UpdateStatsForUserError>>;
  racer?: Maybe<Racer>;
};

export type User = {
  __typename?: 'User';
  averageWpm: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  messages?: Maybe<MessagesConnection>;
  scoreCount: Scalars['Int']['output'];
  scores?: Maybe<ScoresConnection>;
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
};


export type UserMessagesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type UserScoresArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type UserFilterInput = {
  and?: InputMaybe<Array<UserFilterInput>>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  email?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  messages?: InputMaybe<ListFilterInputTypeOfMessageFilterInput>;
  or?: InputMaybe<Array<UserFilterInput>>;
  scores?: InputMaybe<ListFilterInputTypeOfScoreFilterInput>;
  updatedAt?: InputMaybe<DateTimeOperationFilterInput>;
  username?: InputMaybe<StringOperationFilterInput>;
};

export type UserMonthlySummary = {
  __typename?: 'UserMonthlySummary';
  accuracy: Scalars['Float']['output'];
  date: Scalars['DateTime']['output'];
  rawWpm: Scalars['Int']['output'];
  wpm: Scalars['Int']['output'];
};

export type UserSortInput = {
  createdAt?: InputMaybe<SortEnumType>;
  email?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  updatedAt?: InputMaybe<SortEnumType>;
  username?: InputMaybe<SortEnumType>;
};

export type UsernameTakenError = Error & {
  __typename?: 'UsernameTakenError';
  message: Scalars['String']['output'];
};

/** A connection to a list of items. */
export type UsersConnection = {
  __typename?: 'UsersConnection';
  /** A list of edges. */
  edges?: Maybe<Array<UsersEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<User>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type UsersEdge = {
  __typename?: 'UsersEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: User;
};

export type UuidOperationFilterInput = {
  eq?: InputMaybe<Scalars['UUID']['input']>;
  gt?: InputMaybe<Scalars['UUID']['input']>;
  gte?: InputMaybe<Scalars['UUID']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['UUID']['input']>>>;
  lt?: InputMaybe<Scalars['UUID']['input']>;
  lte?: InputMaybe<Scalars['UUID']['input']>;
  neq?: InputMaybe<Scalars['UUID']['input']>;
  ngt?: InputMaybe<Scalars['UUID']['input']>;
  ngte?: InputMaybe<Scalars['UUID']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['UUID']['input']>>>;
  nlt?: InputMaybe<Scalars['UUID']['input']>;
  nlte?: InputMaybe<Scalars['UUID']['input']>;
};

export type Login_MeQueryVariables = Exact<{ [key: string]: never; }>;


export type Login_MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: any, username: string, email: string } | null };

export type CreateRaceForm_CreateRaceMutationVariables = Exact<{
  input: CreateRaceInput;
}>;


export type CreateRaceForm_CreateRaceMutation = { __typename?: 'Mutation', createRace: { __typename?: 'CreateRacePayload', race?: { __typename?: 'Race', id: any, unlisted: boolean, slug: string } | null, errors?: Array<{ __typename?: 'NotAuthenticatedError', message: string, code: 'NotAuthenticatedError' }> | null } };

export type RaceBox_MeQueryVariables = Exact<{ [key: string]: never; }>;


export type RaceBox_MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: any, username: string, email: string } | null };

export type RaceBox_OnRaceEventSubscriptionVariables = Exact<{
  raceId: Scalars['UUID']['input'];
  racersFirst?: InputMaybe<Scalars['Int']['input']>;
}>;


export type RaceBox_OnRaceEventSubscription = { __typename?: 'Subscription', onRaceEvent: { __typename?: 'Race', id: any, mode: string, modeSetting: number, started: boolean, running: boolean, finished: boolean, content: string, chatboxId: any, startTime?: any | null, racers?: { __typename?: 'RacersConnection', edges?: Array<{ __typename?: 'RacersEdge', node: { __typename?: 'Racer', id: any, finished: boolean, wpm: number, wordsTyped: number, user: { __typename?: 'User', id: any, username: string } } }> | null } | null, host: { __typename?: 'User', id: any, username: string } } };

export type RaceBox_FinishRaceForUserMutationVariables = Exact<{
  input: FinishRaceForUserInput;
}>;


export type RaceBox_FinishRaceForUserMutation = { __typename?: 'Mutation', finishRaceForUser: { __typename?: 'FinishRaceForUserPayload', racer?: { __typename?: 'Racer', id: any, finished: boolean } | null, errors?: Array<{ __typename?: 'InvalidRaceError', message: string, code: 'InvalidRaceError' } | { __typename?: 'InvalidRacerError', message: string, code: 'InvalidRacerError' } | { __typename?: 'InvalidUserError', message: string, code: 'InvalidUserError' }> | null } };

export type RaceBox_UpdateStatsForUserMutationVariables = Exact<{
  input: UpdateStatsForUserInput;
}>;


export type RaceBox_UpdateStatsForUserMutation = { __typename?: 'Mutation', updateStatsForUser: { __typename?: 'UpdateStatsForUserPayload', racer?: { __typename?: 'Racer', id: any } | null, errors?: Array<{ __typename?: 'InvalidRaceError', message: string, code: 'InvalidRaceError' } | { __typename?: 'InvalidRacerError', message: string, code: 'InvalidRacerError' } | { __typename?: 'InvalidUserError', message: string, code: 'InvalidUserError' }> | null } };

export type RaceBox_FinishRaceMutationVariables = Exact<{
  input: FinishRaceInput;
}>;


export type RaceBox_FinishRaceMutation = { __typename?: 'Mutation', finishRace: { __typename?: 'FinishRacePayload', race?: { __typename?: 'Race', id: any } | null, errors?: Array<{ __typename?: 'InvalidRaceError', message: string, code: 'InvalidRaceError' }> | null } };

export type RaceBox_JoinRaceMutationVariables = Exact<{
  input: JoinRaceInput;
}>;


export type RaceBox_JoinRaceMutation = { __typename?: 'Mutation', joinRace: { __typename?: 'JoinRacePayload', race?: { __typename?: 'Race', id: any } | null } };

export type RaceBox_LeaveRaceMutationVariables = Exact<{
  input: LeaveRaceInput;
}>;


export type RaceBox_LeaveRaceMutation = { __typename?: 'Mutation', leaveRace: { __typename?: 'LeaveRacePayload', race?: { __typename?: 'Race', id: any } | null } };

export type RaceBox_CreateScoreMutationVariables = Exact<{
  input: CreateScoreInput;
}>;


export type RaceBox_CreateScoreMutation = { __typename?: 'Mutation', createScore: { __typename?: 'CreateScorePayload', score?: { __typename?: 'Score', id: any, wpm: number, rawWpm: number, mode: string, modeSetting: number, content: string, language: string, user?: { __typename?: 'User', username: string } | null } | null } };

export type RaceBox_StartRaceMutationVariables = Exact<{
  input: StartRaceInput;
}>;


export type RaceBox_StartRaceMutation = { __typename?: 'Mutation', startRace: { __typename?: 'StartRacePayload', race?: { __typename?: 'Race', started: boolean, running: boolean, updatedAt: any } | null, errors?: Array<{ __typename?: 'InvalidRaceError', message: string, code: 'InvalidRaceError' } | { __typename?: 'NotAuthenticatedError', message: string, code: 'NotAuthenticatedError' } | { __typename?: 'NotAuthorizedError', message: string, code: 'NotAuthorizedError' } | { __typename?: 'RaceAlreadyRunningError', message: string, code: 'RaceAlreadyRunningError' } | { __typename?: 'TooFewRacersError', message: string, code: 'TooFewRacersError' }> | null } };

export type RaceBox_RunRaceMutationVariables = Exact<{
  input: RunRaceInput;
}>;


export type RaceBox_RunRaceMutation = { __typename?: 'Mutation', runRace: { __typename?: 'RunRacePayload', race?: { __typename?: 'Race', running: boolean } | null, errors?: Array<{ __typename?: 'InvalidRaceError', message: string, code: 'InvalidRaceError' } | { __typename?: 'NotAuthenticatedError', message: string, code: 'NotAuthenticatedError' } | { __typename?: 'NotAuthorizedError', message: string, code: 'NotAuthorizedError' }> | null } };

export type RacePage_GetRaceQueryVariables = Exact<{
  where?: InputMaybe<RaceFilterInput>;
  racersFirst: Scalars['Int']['input'];
}>;


export type RacePage_GetRaceQuery = { __typename?: 'Query', race?: { __typename?: 'Race', id: any, startTime?: any | null, createdAt: any, content: string, unlisted: boolean, running: boolean, finished: boolean, racers?: { __typename?: 'RacersConnection', edges?: Array<{ __typename?: 'RacersEdge', node: { __typename?: 'Racer', wpm: number, user: { __typename?: 'User', username: string } } }> | null } | null, host: { __typename?: 'User', username: string } } | null };

export type RacesPage_MeQueryVariables = Exact<{ [key: string]: never; }>;


export type RacesPage_MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: any, username: string, email: string } | null };

export type LoginForm_LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginForm_LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginPayload', user?: { __typename?: 'User', id: any, username: string, email: string } | null, errors?: Array<{ __typename?: 'IncorrectCredentialsError', message: string, code: 'IncorrectCredentialsError' } | { __typename?: 'InvalidFieldError', message: string, code: 'InvalidFieldError' }> | null } };

export type RegisterForm_RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterForm_RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'RegisterPayload', user?: { __typename?: 'User', username: string, email: string } | null, errors?: Array<{ __typename?: 'InvalidFieldError', message: string, code: 'InvalidFieldError' } | { __typename?: 'UsernameTakenError', message: string, code: 'UsernameTakenError' }> | null } };

export type Leaderboard_GetScoresForLeaderboardQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  mode: Scalars['String']['input'];
  modeSetting: Scalars['Int']['input'];
}>;


export type Leaderboard_GetScoresForLeaderboardQuery = { __typename?: 'Query', scoresForLeaderboard?: { __typename?: 'ScoresForLeaderboardConnection', edges?: Array<{ __typename?: 'ScoresForLeaderboardEdge', cursor: string, node: { __typename?: 'Score', id: any, wpm: number, rawWpm: number, accuracy: number, mode: string, modeSetting: number, content: string, createdAt: any, user?: { __typename?: 'User', username: string } | null } }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } | null };

export type AuthBox_LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type AuthBox_LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'LogoutPayload', boolean?: boolean | null } };

export type Navbar_MeQueryVariables = Exact<{ [key: string]: never; }>;


export type Navbar_MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: any, username: string, email: string } | null };

export type ScoreInfoFragment = { __typename?: 'Score', wpm: number, rawWpm: number, mode: string, modeSetting: number, content: string, language: string, accuracy: number, wpmStats: Array<number>, rawStats: Array<number>, user?: { __typename?: 'User', username: string } | null };

export type MainBox_CreateScoreMutationVariables = Exact<{
  input: CreateScoreInput;
}>;


export type MainBox_CreateScoreMutation = { __typename?: 'Mutation', createScore: { __typename?: 'CreateScorePayload', score?: { __typename?: 'Score', id: any, wpm: number, rawWpm: number, mode: string, modeSetting: number, content: string, language: string, accuracy: number, wpmStats: Array<number>, rawStats: Array<number>, user?: { __typename?: 'User', username: string } | null } | null } };

export type UserInfoFragmentFragment = { __typename?: 'User', username: string, email: string };

export type CreateRaceMutationVariables = Exact<{
  input: CreateRaceInput;
}>;


export type CreateRaceMutation = { __typename?: 'Mutation', createRace: { __typename?: 'CreateRacePayload', race?: { __typename?: 'Race', id: any, unlisted: boolean, slug: string } | null, errors?: Array<{ __typename?: 'NotAuthenticatedError', message: string, code: 'NotAuthenticatedError' }> | null } };

export type CreateScoreMutationVariables = Exact<{
  input: CreateScoreInput;
}>;


export type CreateScoreMutation = { __typename?: 'Mutation', createScore: { __typename?: 'CreateScorePayload', score?: { __typename?: 'Score', id: any, wpm: number, rawWpm: number, mode: string, modeSetting: number, content: string, language: string, user?: { __typename?: 'User', username: string } | null } | null } };

export type FinishRaceMutationVariables = Exact<{
  input: FinishRaceInput;
}>;


export type FinishRaceMutation = { __typename?: 'Mutation', finishRace: { __typename?: 'FinishRacePayload', race?: { __typename?: 'Race', id: any } | null, errors?: Array<{ __typename?: 'InvalidRaceError', message: string, code: 'InvalidRaceError' }> | null } };

export type FinishRaceForUserMutationVariables = Exact<{
  input: FinishRaceForUserInput;
}>;


export type FinishRaceForUserMutation = { __typename?: 'Mutation', finishRaceForUser: { __typename?: 'FinishRaceForUserPayload', racer?: { __typename?: 'Racer', id: any, finished: boolean } | null, errors?: Array<{ __typename?: 'InvalidRaceError', message: string, code: 'InvalidRaceError' } | { __typename?: 'InvalidRacerError', message: string, code: 'InvalidRacerError' } | { __typename?: 'InvalidUserError', message: string, code: 'InvalidUserError' }> | null } };

export type JoinChatboxMutationVariables = Exact<{
  input: JoinChatboxInput;
}>;


export type JoinChatboxMutation = { __typename?: 'Mutation', joinChatbox: { __typename?: 'JoinChatboxPayload', chatbox?: { __typename?: 'Chatbox', messages?: { __typename?: 'MessagesConnection', edges?: Array<{ __typename?: 'MessagesEdge', node: { __typename?: 'Message', content: string } }> | null } | null } | null } };

export type JoinRaceMutationVariables = Exact<{
  input: JoinRaceInput;
}>;


export type JoinRaceMutation = { __typename?: 'Mutation', joinRace: { __typename?: 'JoinRacePayload', race?: { __typename?: 'Race', id: any } | null } };

export type LeaveRaceMutationVariables = Exact<{
  input: LeaveRaceInput;
}>;


export type LeaveRaceMutation = { __typename?: 'Mutation', leaveRace: { __typename?: 'LeaveRacePayload', race?: { __typename?: 'Race', id: any } | null } };

export type RunRaceMutationVariables = Exact<{
  input: RunRaceInput;
}>;


export type RunRaceMutation = { __typename?: 'Mutation', runRace: { __typename?: 'RunRacePayload', race?: { __typename?: 'Race', running: boolean } | null, errors?: Array<{ __typename?: 'InvalidRaceError', message: string, code: 'InvalidRaceError' } | { __typename?: 'NotAuthenticatedError', message: string, code: 'NotAuthenticatedError' } | { __typename?: 'NotAuthorizedError', message: string, code: 'NotAuthorizedError' }> | null } };

export type SendMessageMutationVariables = Exact<{
  input: SendMessageInput;
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage: { __typename?: 'SendMessagePayload', message?: { __typename?: 'Message', id: any } | null, errors?: Array<{ __typename?: 'InvalidChatboxError', message: string, code: 'InvalidChatboxError' } | { __typename?: 'NotAuthenticatedError', message: string, code: 'NotAuthenticatedError' }> | null } };

export type StartRaceMutationVariables = Exact<{
  input: StartRaceInput;
}>;


export type StartRaceMutation = { __typename?: 'Mutation', startRace: { __typename?: 'StartRacePayload', race?: { __typename?: 'Race', started: boolean, running: boolean, updatedAt: any } | null, errors?: Array<{ __typename?: 'InvalidRaceError', message: string, code: 'InvalidRaceError' } | { __typename?: 'NotAuthenticatedError', message: string, code: 'NotAuthenticatedError' } | { __typename?: 'NotAuthorizedError', message: string, code: 'NotAuthorizedError' } | { __typename?: 'RaceAlreadyRunningError', message: string, code: 'RaceAlreadyRunningError' } | { __typename?: 'TooFewRacersError', message: string, code: 'TooFewRacersError' }> | null } };

export type UpdateStatsForUserMutationVariables = Exact<{
  input: UpdateStatsForUserInput;
}>;


export type UpdateStatsForUserMutation = { __typename?: 'Mutation', updateStatsForUser: { __typename?: 'UpdateStatsForUserPayload', racer?: { __typename?: 'Racer', id: any } | null, errors?: Array<{ __typename?: 'InvalidRaceError', message: string, code: 'InvalidRaceError' } | { __typename?: 'InvalidRacerError', message: string, code: 'InvalidRacerError' } | { __typename?: 'InvalidUserError', message: string, code: 'InvalidUserError' }> | null } };

export type ByeQueryVariables = Exact<{ [key: string]: never; }>;


export type ByeQuery = { __typename?: 'Query', bye: string };

export type GetRacesQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  racesFirst?: InputMaybe<Scalars['Int']['input']>;
  racesLast?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<RaceSortInput> | RaceSortInput>;
  where?: InputMaybe<RaceFilterInput>;
  racersFirst?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetRacesQuery = { __typename?: 'Query', races?: { __typename?: 'RacesConnection', edges?: Array<{ __typename?: 'RacesEdge', node: { __typename?: 'Race', id: any, createdAt: any, unlisted: boolean, slug: string, finished: boolean, racers?: { __typename?: 'RacersConnection', edges?: Array<{ __typename?: 'RacersEdge', node: { __typename?: 'Racer', wpm: number, user: { __typename?: 'User', username: string } } }> | null } | null, host: { __typename?: 'User', username: string } } }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } | null };

export type GetScoreQueryVariables = Exact<{
  where?: InputMaybe<ScoreFilterInput>;
}>;


export type GetScoreQuery = { __typename?: 'Query', score?: { __typename?: 'Score', id: any, wpm: number, rawWpm: number } | null };

export type GetScoresQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<ScoreSortInput> | ScoreSortInput>;
  where?: InputMaybe<ScoreFilterInput>;
}>;


export type GetScoresQuery = { __typename?: 'Query', scores?: { __typename?: 'ScoresConnection', edges?: Array<{ __typename?: 'ScoresEdge', cursor: string, node: { __typename?: 'Score', id: any, wpm: number, rawWpm: number, accuracy: number, userId?: any | null, mode: string, modeSetting: number, content: string, createdAt: any, user?: { __typename?: 'User', username: string } | null } }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } | null };

export type UserPage_GetUserQueryVariables = Exact<{
  where?: InputMaybe<UserFilterInput>;
}>;


export type UserPage_GetUserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: any, username: string, averageWpm: number, scoreCount: number, createdAt: any } | null };

export type UserPage_GetUserMonthlyScoreSummariesQueryVariables = Exact<{
  userId: Scalars['UUID']['input'];
}>;


export type UserPage_GetUserMonthlyScoreSummariesQuery = { __typename?: 'Query', userMonthlyScoreSummaries: Array<{ __typename?: 'UserMonthlySummary', wpm: number, rawWpm: number, accuracy: number, date: any } | null> };

export type UserPage_GetUsersBestScoresQueryVariables = Exact<{
  userId: Scalars['UUID']['input'];
  mode: Scalars['String']['input'];
  modeSettings: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type UserPage_GetUsersBestScoresQuery = { __typename?: 'Query', usersBestScores: Array<{ __typename?: 'Score', wpm: number, rawWpm: number, mode: string, modeSetting: number, accuracy: number, createdAt: any } | null> };

export type OnChatboxEventSubscriptionVariables = Exact<{
  chatboxId: Scalars['UUID']['input'];
  messagesLast?: InputMaybe<Scalars['Int']['input']>;
}>;


export type OnChatboxEventSubscription = { __typename?: 'Subscription', onChatboxEvent: { __typename?: 'Chatbox', messages?: { __typename?: 'MessagesConnection', edges?: Array<{ __typename?: 'MessagesEdge', node: { __typename?: 'Message', id: any, content: string, createdAt: any, author: { __typename?: 'User', username: string } } }> | null } | null } };

export type OnRaceEventSubscriptionVariables = Exact<{
  raceId: Scalars['UUID']['input'];
  racersFirst?: InputMaybe<Scalars['Int']['input']>;
}>;


export type OnRaceEventSubscription = { __typename?: 'Subscription', onRaceEvent: { __typename?: 'Race', id: any, mode: string, modeSetting: number, started: boolean, running: boolean, finished: boolean, content: string, chatboxId: any, startTime?: any | null, racers?: { __typename?: 'RacersConnection', edges?: Array<{ __typename?: 'RacersEdge', node: { __typename?: 'Racer', id: any, finished: boolean, wpm: number, wordsTyped: number, user: { __typename?: 'User', id: any, username: string } } }> | null } | null, host: { __typename?: 'User', id: any, username: string } } };

export const ScoreInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ScoreInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Score"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"wpm"}},{"kind":"Field","name":{"kind":"Name","value":"rawWpm"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"modeSetting"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"accuracy"}},{"kind":"Field","name":{"kind":"Name","value":"wpmStats"}},{"kind":"Field","name":{"kind":"Name","value":"rawStats"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<ScoreInfoFragment, unknown>;
export const UserInfoFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserInfoFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]} as unknown as DocumentNode<UserInfoFragmentFragment, unknown>;
export const Login_MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Login_Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserInfoFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserInfoFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]} as unknown as DocumentNode<Login_MeQuery, Login_MeQueryVariables>;
export const CreateRaceForm_CreateRaceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateRaceForm_CreateRace"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateRaceInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRace"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"race"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"unlisted"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"code"},"name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateRaceForm_CreateRaceMutation, CreateRaceForm_CreateRaceMutationVariables>;
export const RaceBox_MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RaceBox_Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserInfoFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserInfoFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]} as unknown as DocumentNode<RaceBox_MeQuery, RaceBox_MeQueryVariables>;
export const RaceBox_OnRaceEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"RaceBox_OnRaceEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"raceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"racersFirst"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"onRaceEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"raceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"raceId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"modeSetting"}},{"kind":"Field","name":{"kind":"Name","value":"racers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"racersFirst"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"finished"}},{"kind":"Field","name":{"kind":"Name","value":"wpm"}},{"kind":"Field","name":{"kind":"Name","value":"wordsTyped"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"host"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"started"}},{"kind":"Field","name":{"kind":"Name","value":"running"}},{"kind":"Field","name":{"kind":"Name","value":"finished"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"chatboxId"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}}]}}]}}]} as unknown as DocumentNode<RaceBox_OnRaceEventSubscription, RaceBox_OnRaceEventSubscriptionVariables>;
export const RaceBox_FinishRaceForUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RaceBox_FinishRaceForUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FinishRaceForUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"finishRaceForUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"racer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"finished"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"code"},"name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]} as unknown as DocumentNode<RaceBox_FinishRaceForUserMutation, RaceBox_FinishRaceForUserMutationVariables>;
export const RaceBox_UpdateStatsForUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RaceBox_UpdateStatsForUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateStatsForUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateStatsForUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"racer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"code"},"name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]} as unknown as DocumentNode<RaceBox_UpdateStatsForUserMutation, RaceBox_UpdateStatsForUserMutationVariables>;
export const RaceBox_FinishRaceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RaceBox_FinishRace"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FinishRaceInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"finishRace"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"race"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"code"},"name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]} as unknown as DocumentNode<RaceBox_FinishRaceMutation, RaceBox_FinishRaceMutationVariables>;
export const RaceBox_JoinRaceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RaceBox_JoinRace"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"JoinRaceInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"joinRace"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"race"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<RaceBox_JoinRaceMutation, RaceBox_JoinRaceMutationVariables>;
export const RaceBox_LeaveRaceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RaceBox_LeaveRace"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LeaveRaceInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"leaveRace"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"race"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<RaceBox_LeaveRaceMutation, RaceBox_LeaveRaceMutationVariables>;
export const RaceBox_CreateScoreDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RaceBox_CreateScore"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateScoreInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createScore"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"score"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"wpm"}},{"kind":"Field","name":{"kind":"Name","value":"rawWpm"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"modeSetting"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]}}]} as unknown as DocumentNode<RaceBox_CreateScoreMutation, RaceBox_CreateScoreMutationVariables>;
export const RaceBox_StartRaceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RaceBox_StartRace"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StartRaceInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startRace"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"race"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"started"}},{"kind":"Field","name":{"kind":"Name","value":"running"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"code"},"name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]} as unknown as DocumentNode<RaceBox_StartRaceMutation, RaceBox_StartRaceMutationVariables>;
export const RaceBox_RunRaceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RaceBox_RunRace"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RunRaceInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"runRace"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"race"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"running"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"code"},"name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]} as unknown as DocumentNode<RaceBox_RunRaceMutation, RaceBox_RunRaceMutationVariables>;
export const RacePage_GetRaceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RacePage_GetRace"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"RaceFilterInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"racersFirst"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"race"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"racers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"racersFirst"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wpm"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"host"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"unlisted"}},{"kind":"Field","name":{"kind":"Name","value":"running"}},{"kind":"Field","name":{"kind":"Name","value":"finished"}}]}}]}}]} as unknown as DocumentNode<RacePage_GetRaceQuery, RacePage_GetRaceQueryVariables>;
export const RacesPage_MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RacesPage_Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserInfoFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserInfoFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]} as unknown as DocumentNode<RacesPage_MeQuery, RacesPage_MeQueryVariables>;
export const LoginForm_LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginForm_Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserInfoFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"code"},"name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserInfoFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]} as unknown as DocumentNode<LoginForm_LoginMutation, LoginForm_LoginMutationVariables>;
export const RegisterForm_RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RegisterForm_Register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RegisterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserInfoFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"code"},"name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserInfoFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]} as unknown as DocumentNode<RegisterForm_RegisterMutation, RegisterForm_RegisterMutationVariables>;
export const Leaderboard_GetScoresForLeaderboardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Leaderboard_GetScoresForLeaderboard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"before"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"last"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"modeSetting"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"scoresForLeaderboard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"before"},"value":{"kind":"Variable","name":{"kind":"Name","value":"before"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"last"},"value":{"kind":"Variable","name":{"kind":"Name","value":"last"}}},{"kind":"Argument","name":{"kind":"Name","value":"mode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mode"}}},{"kind":"Argument","name":{"kind":"Name","value":"modeSetting"},"value":{"kind":"Variable","name":{"kind":"Name","value":"modeSetting"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"wpm"}},{"kind":"Field","name":{"kind":"Name","value":"rawWpm"}},{"kind":"Field","name":{"kind":"Name","value":"accuracy"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"modeSetting"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}}]}}]}}]} as unknown as DocumentNode<Leaderboard_GetScoresForLeaderboardQuery, Leaderboard_GetScoresForLeaderboardQueryVariables>;
export const AuthBox_LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AuthBox_Logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"boolean"}}]}}]}}]} as unknown as DocumentNode<AuthBox_LogoutMutation, AuthBox_LogoutMutationVariables>;
export const Navbar_MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Navbar_Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserInfoFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserInfoFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]} as unknown as DocumentNode<Navbar_MeQuery, Navbar_MeQueryVariables>;
export const MainBox_CreateScoreDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MainBox_CreateScore"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateScoreInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createScore"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"score"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ScoreInfo"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ScoreInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Score"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"wpm"}},{"kind":"Field","name":{"kind":"Name","value":"rawWpm"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"modeSetting"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"accuracy"}},{"kind":"Field","name":{"kind":"Name","value":"wpmStats"}},{"kind":"Field","name":{"kind":"Name","value":"rawStats"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<MainBox_CreateScoreMutation, MainBox_CreateScoreMutationVariables>;
export const CreateRaceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateRace"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateRaceInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRace"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"race"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"unlisted"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"code"},"name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateRaceMutation, CreateRaceMutationVariables>;
export const CreateScoreDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateScore"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateScoreInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createScore"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"score"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"wpm"}},{"kind":"Field","name":{"kind":"Name","value":"rawWpm"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"modeSetting"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateScoreMutation, CreateScoreMutationVariables>;
export const FinishRaceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"FinishRace"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FinishRaceInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"finishRace"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"race"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"code"},"name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]} as unknown as DocumentNode<FinishRaceMutation, FinishRaceMutationVariables>;
export const FinishRaceForUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"FinishRaceForUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FinishRaceForUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"finishRaceForUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"racer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"finished"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"code"},"name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]} as unknown as DocumentNode<FinishRaceForUserMutation, FinishRaceForUserMutationVariables>;
export const JoinChatboxDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"JoinChatbox"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"JoinChatboxInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"joinChatbox"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chatbox"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<JoinChatboxMutation, JoinChatboxMutationVariables>;
export const JoinRaceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"JoinRace"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"JoinRaceInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"joinRace"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"race"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<JoinRaceMutation, JoinRaceMutationVariables>;
export const LeaveRaceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LeaveRace"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LeaveRaceInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"leaveRace"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"race"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<LeaveRaceMutation, LeaveRaceMutationVariables>;
export const RunRaceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RunRace"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RunRaceInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"runRace"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"race"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"running"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"code"},"name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]} as unknown as DocumentNode<RunRaceMutation, RunRaceMutationVariables>;
export const SendMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SendMessageInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"code"},"name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SendMessageMutation, SendMessageMutationVariables>;
export const StartRaceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"StartRace"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StartRaceInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startRace"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"race"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"started"}},{"kind":"Field","name":{"kind":"Name","value":"running"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"code"},"name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]} as unknown as DocumentNode<StartRaceMutation, StartRaceMutationVariables>;
export const UpdateStatsForUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateStatsForUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateStatsForUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateStatsForUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"racer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"code"},"name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateStatsForUserMutation, UpdateStatsForUserMutationVariables>;
export const ByeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Bye"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bye"}}]}}]} as unknown as DocumentNode<ByeQuery, ByeQueryVariables>;
export const GetRacesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRaces"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"before"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"racesFirst"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"racesLast"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"order"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RaceSortInput"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"RaceFilterInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"racersFirst"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"races"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"before"},"value":{"kind":"Variable","name":{"kind":"Name","value":"before"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"racesFirst"}}},{"kind":"Argument","name":{"kind":"Name","value":"last"},"value":{"kind":"Variable","name":{"kind":"Name","value":"racesLast"}}},{"kind":"Argument","name":{"kind":"Name","value":"order"},"value":{"kind":"Variable","name":{"kind":"Name","value":"order"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"racers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"racersFirst"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wpm"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"host"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"unlisted"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"finished"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}}]}}]}}]} as unknown as DocumentNode<GetRacesQuery, GetRacesQueryVariables>;
export const GetScoreDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetScore"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ScoreFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"score"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"wpm"}},{"kind":"Field","name":{"kind":"Name","value":"rawWpm"}}]}}]}}]} as unknown as DocumentNode<GetScoreQuery, GetScoreQueryVariables>;
export const GetScoresDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetScores"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"before"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"last"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"order"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ScoreSortInput"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ScoreFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"scores"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"before"},"value":{"kind":"Variable","name":{"kind":"Name","value":"before"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"last"},"value":{"kind":"Variable","name":{"kind":"Name","value":"last"}}},{"kind":"Argument","name":{"kind":"Name","value":"order"},"value":{"kind":"Variable","name":{"kind":"Name","value":"order"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"wpm"}},{"kind":"Field","name":{"kind":"Name","value":"rawWpm"}},{"kind":"Field","name":{"kind":"Name","value":"accuracy"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"modeSetting"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}}]}}]}}]} as unknown as DocumentNode<GetScoresQuery, GetScoresQueryVariables>;
export const UserPage_GetUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserPage_GetUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UserFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"averageWpm"}},{"kind":"Field","name":{"kind":"Name","value":"scoreCount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<UserPage_GetUserQuery, UserPage_GetUserQueryVariables>;
export const UserPage_GetUserMonthlyScoreSummariesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserPage_GetUserMonthlyScoreSummaries"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userMonthlyScoreSummaries"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"wpm"}},{"kind":"Field","name":{"kind":"Name","value":"rawWpm"}},{"kind":"Field","name":{"kind":"Name","value":"accuracy"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}}]}}]} as unknown as DocumentNode<UserPage_GetUserMonthlyScoreSummariesQuery, UserPage_GetUserMonthlyScoreSummariesQueryVariables>;
export const UserPage_GetUsersBestScoresDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserPage_GetUsersBestScores"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"modeSettings"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"usersBestScores"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"mode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mode"}}},{"kind":"Argument","name":{"kind":"Name","value":"modeSettings"},"value":{"kind":"Variable","name":{"kind":"Name","value":"modeSettings"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"wpm"}},{"kind":"Field","name":{"kind":"Name","value":"rawWpm"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"modeSetting"}},{"kind":"Field","name":{"kind":"Name","value":"accuracy"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<UserPage_GetUsersBestScoresQuery, UserPage_GetUsersBestScoresQueryVariables>;
export const OnChatboxEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnChatboxEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatboxId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"messagesLast"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"onChatboxEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chatboxId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatboxId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"last"},"value":{"kind":"Variable","name":{"kind":"Name","value":"messagesLast"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<OnChatboxEventSubscription, OnChatboxEventSubscriptionVariables>;
export const OnRaceEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnRaceEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"raceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"racersFirst"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"onRaceEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"raceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"raceId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"modeSetting"}},{"kind":"Field","name":{"kind":"Name","value":"racers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"racersFirst"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"finished"}},{"kind":"Field","name":{"kind":"Name","value":"wpm"}},{"kind":"Field","name":{"kind":"Name","value":"wordsTyped"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"host"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"started"}},{"kind":"Field","name":{"kind":"Name","value":"running"}},{"kind":"Field","name":{"kind":"Name","value":"finished"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"chatboxId"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}}]}}]}}]} as unknown as DocumentNode<OnRaceEventSubscription, OnRaceEventSubscriptionVariables>;