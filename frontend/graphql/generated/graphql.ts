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
  UUID: { input: any; output: any; }
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
  messages: Array<Message>;
  updatedAt: Scalars['DateTime']['output'];
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

export type CreateChatboxPayload = {
  __typename?: 'CreateChatboxPayload';
  chatbox?: Maybe<Chatbox>;
};

export type CreateRaceError = NotAuthenticatedError;

export type CreateRaceInput = {
  content: Scalars['String']['input'];
  isPrivate: Scalars['Boolean']['input'];
  mode: Scalars['String']['input'];
  modeSetting: Scalars['Int']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
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

export type FinishRaceForUserError = InvalidRaceError | InvalidUserError | NotAuthorizedError;

export type FinishRaceForUserInput = {
  raceId: Scalars['UUID']['input'];
  userId: Scalars['UUID']['input'];
};

export type FinishRaceForUserPayload = {
  __typename?: 'FinishRaceForUserPayload';
  errors?: Maybe<Array<FinishRaceForUserError>>;
  race?: Maybe<Race>;
};

export type FlipRunningStatusInput = {
  raceId: Scalars['UUID']['input'];
};

export type FlipRunningStatusPayload = {
  __typename?: 'FlipRunningStatusPayload';
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

export type InvalidFieldError = Error & {
  __typename?: 'InvalidFieldError';
  message: Scalars['String']['output'];
};

export type InvalidRaceError = Error & {
  __typename?: 'InvalidRaceError';
  message: Scalars['String']['output'];
};

export type InvalidUserError = Error & {
  __typename?: 'InvalidUserError';
  message: Scalars['String']['output'];
};

export type JoinChatboxInput = {
  chatboxId: Scalars['UUID']['input'];
  userId: Scalars['UUID']['input'];
};

export type JoinChatboxPayload = {
  __typename?: 'JoinChatboxPayload';
  chatbox?: Maybe<Chatbox>;
};

export type JoinRaceInput = {
  password?: InputMaybe<Scalars['String']['input']>;
  raceId: Scalars['UUID']['input'];
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

export type JoinRacePayload = {
  __typename?: 'JoinRacePayload';
  race?: Maybe<Race>;
};

export type LeaveRaceInput = {
  raceId: Scalars['UUID']['input'];
  userId: Scalars['UUID']['input'];
};

export type LeaveRacePayload = {
  __typename?: 'LeaveRacePayload';
  race?: Maybe<Race>;
};

export type ListFilterInputTypeOfMessageFilterInput = {
  all?: InputMaybe<MessageFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<MessageFilterInput>;
  some?: InputMaybe<MessageFilterInput>;
};

export type ListFilterInputTypeOfScoreFilterInput = {
  all?: InputMaybe<ScoreFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<ScoreFilterInput>;
  some?: InputMaybe<ScoreFilterInput>;
};

export type ListFilterInputTypeOfUserFilterInput = {
  all?: InputMaybe<UserFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<UserFilterInput>;
  some?: InputMaybe<UserFilterInput>;
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

export type Mutation = {
  __typename?: 'Mutation';
  createChatbox: CreateChatboxPayload;
  createRace: CreateRacePayload;
  createScore: CreateScorePayload;
  deleteUser: DeleteUserPayload;
  finishRaceForUser: FinishRaceForUserPayload;
  flipRunningStatus: FlipRunningStatusPayload;
  joinChatbox: JoinChatboxPayload;
  joinRace: JoinRacePayload;
  leaveRace: LeaveRacePayload;
  login: LoginPayload;
  logout: LogoutPayload;
  register: RegisterPayload;
  sendMessage: SendMessagePayload;
  startRace: StartRacePayload;
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


export type MutationFinishRaceForUserArgs = {
  input: FinishRaceForUserInput;
};


export type MutationFlipRunningStatusArgs = {
  input: FlipRunningStatusInput;
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


export type MutationSendMessageArgs = {
  input: SendMessageInput;
};


export type MutationStartRaceArgs = {
  input: StartRaceInput;
};

export type NotAuthenticatedError = Error & {
  __typename?: 'NotAuthenticatedError';
  message: Scalars['String']['output'];
};

export type NotAuthorizedError = Error & {
  __typename?: 'NotAuthorizedError';
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
  allChatboxes: Array<Chatbox>;
  allRaces: Array<Race>;
  allScores: Array<Score>;
  allUsers: Array<User>;
  bye: Scalars['String']['output'];
  hello: Scalars['String']['output'];
  me?: Maybe<User>;
  racersStatistics: Array<RacerStatistics>;
  races?: Maybe<RacesConnection>;
  score?: Maybe<Score>;
  scores?: Maybe<ScoresConnection>;
  userById?: Maybe<User>;
  userByUsername?: Maybe<User>;
  usersBestScores: Array<Maybe<Score>>;
};


export type QueryRacersStatisticsArgs = {
  raceId: Scalars['UUID']['input'];
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
  id: Scalars['UUID']['input'];
};


export type QueryScoresArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<ScoreSortInput>>;
  where?: InputMaybe<ScoreFilterInput>;
};


export type QueryUserByIdArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryUserByUsernameArgs = {
  username: Scalars['String']['input'];
};


export type QueryUsersBestScoresArgs = {
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
  password?: Maybe<Scalars['String']['output']>;
  private: Scalars['Boolean']['output'];
  racers: Array<User>;
  running: Scalars['Boolean']['output'];
  updatedAt: Scalars['DateTime']['output'];
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
  password?: InputMaybe<StringOperationFilterInput>;
  private?: InputMaybe<BooleanOperationFilterInput>;
  racers?: InputMaybe<ListFilterInputTypeOfUserFilterInput>;
  running?: InputMaybe<BooleanOperationFilterInput>;
  updatedAt?: InputMaybe<DateTimeOperationFilterInput>;
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
  password?: InputMaybe<SortEnumType>;
  private?: InputMaybe<SortEnumType>;
  running?: InputMaybe<SortEnumType>;
  updatedAt?: InputMaybe<SortEnumType>;
};

export type RacerStatistics = {
  __typename?: 'RacerStatistics';
  createdAt: Scalars['DateTime']['output'];
  finished: Scalars['Boolean']['output'];
  id: Scalars['UUID']['output'];
  race: Race;
  racer: User;
  updatedAt: Scalars['DateTime']['output'];
  wpm: Scalars['Int']['output'];
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

export type SendMessageInput = {
  chatboxId: Scalars['UUID']['input'];
  content: Scalars['String']['input'];
  userId: Scalars['UUID']['input'];
};

export type SendMessagePayload = {
  __typename?: 'SendMessagePayload';
  boolean?: Maybe<Scalars['Boolean']['output']>;
};

export enum SortEnumType {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type StartRaceError = InvalidRaceError | NotAuthenticatedError | NotAuthorizedError;

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
  onRaceJoinLeave: Race;
};


export type SubscriptionOnChatboxEventArgs = {
  chatboxId: Scalars['UUID']['input'];
};


export type SubscriptionOnRaceJoinLeaveArgs = {
  raceId: Scalars['UUID']['input'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  password: Scalars['String']['output'];
  scores: Array<Score>;
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
};

export type UserFilterInput = {
  and?: InputMaybe<Array<UserFilterInput>>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  email?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  or?: InputMaybe<Array<UserFilterInput>>;
  password?: InputMaybe<StringOperationFilterInput>;
  scores?: InputMaybe<ListFilterInputTypeOfScoreFilterInput>;
  updatedAt?: InputMaybe<DateTimeOperationFilterInput>;
  username?: InputMaybe<StringOperationFilterInput>;
};

export type UserSortInput = {
  createdAt?: InputMaybe<SortEnumType>;
  email?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  password?: InputMaybe<SortEnumType>;
  updatedAt?: InputMaybe<SortEnumType>;
  username?: InputMaybe<SortEnumType>;
};

export type UsernameTakenError = Error & {
  __typename?: 'UsernameTakenError';
  message: Scalars['String']['output'];
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

export type UserInfoFragmentFragment = { __typename?: 'User', username: string, email: string } & { ' $fragmentName'?: 'UserInfoFragmentFragment' };

export type CreateRaceMutationVariables = Exact<{
  input: CreateRaceInput;
}>;


export type CreateRaceMutation = { __typename?: 'Mutation', createRace: { __typename?: 'CreateRacePayload', race?: { __typename?: 'Race', id: any, private: boolean, racers: Array<{ __typename?: 'User', username: string }> } | null } };

export type CreateScoreMutationVariables = Exact<{
  input: CreateScoreInput;
}>;


export type CreateScoreMutation = { __typename?: 'Mutation', createScore: { __typename?: 'CreateScorePayload', score?: { __typename?: 'Score', id: any, wpm: number, rawWpm: number, mode: string, modeSetting: number, content: string, language: string, user?: { __typename?: 'User', username: string } | null } | null } };

export type FinishRaceForUserMutationVariables = Exact<{
  input: FinishRaceForUserInput;
}>;


export type FinishRaceForUserMutation = { __typename?: 'Mutation', finishRaceForUser: { __typename?: 'FinishRaceForUserPayload', errors?: Array<{ __typename?: 'InvalidRaceError', message: string, code: 'InvalidRaceError' } | { __typename?: 'InvalidUserError', message: string, code: 'InvalidUserError' } | { __typename?: 'NotAuthorizedError', message: string, code: 'NotAuthorizedError' }> | null } };

export type FlipRunningStatusMutationVariables = Exact<{
  input: FlipRunningStatusInput;
}>;


export type FlipRunningStatusMutation = { __typename?: 'Mutation', flipRunningStatus: { __typename?: 'FlipRunningStatusPayload', race?: { __typename?: 'Race', running: boolean } | null } };

export type JoinChatboxMutationVariables = Exact<{
  input: JoinChatboxInput;
}>;


export type JoinChatboxMutation = { __typename?: 'Mutation', joinChatbox: { __typename?: 'JoinChatboxPayload', chatbox?: { __typename?: 'Chatbox', messages: Array<{ __typename?: 'Message', content: string }> } | null } };

export type JoinRaceMutationVariables = Exact<{
  input: JoinRaceInput;
}>;


export type JoinRaceMutation = { __typename?: 'Mutation', joinRace: { __typename?: 'JoinRacePayload', race?: { __typename?: 'Race', racers: Array<{ __typename?: 'User', username: string }> } | null } };

export type LeaveRaceMutationVariables = Exact<{
  input: LeaveRaceInput;
}>;


export type LeaveRaceMutation = { __typename?: 'Mutation', leaveRace: { __typename?: 'LeaveRacePayload', race?: { __typename?: 'Race', racers: Array<{ __typename?: 'User', id: any, username: string }> } | null } };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginPayload', user?: (
      { __typename?: 'User', id: any }
      & { ' $fragmentRefs'?: { 'UserInfoFragmentFragment': UserInfoFragmentFragment } }
    ) | null, errors?: Array<{ __typename?: 'IncorrectCredentialsError', message: string, code: 'IncorrectCredentialsError' } | { __typename?: 'InvalidFieldError', message: string, code: 'InvalidFieldError' }> | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'LogoutPayload', boolean?: boolean | null } };

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'RegisterPayload', user?: (
      { __typename?: 'User' }
      & { ' $fragmentRefs'?: { 'UserInfoFragmentFragment': UserInfoFragmentFragment } }
    ) | null, errors?: Array<{ __typename?: 'InvalidFieldError', message: string, code: 'InvalidFieldError' } | { __typename?: 'UsernameTakenError', message: string, code: 'UsernameTakenError' }> | null } };

export type SendMessageMutationVariables = Exact<{
  input: SendMessageInput;
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage: { __typename?: 'SendMessagePayload', boolean?: boolean | null } };

export type StartRaceMutationVariables = Exact<{
  input: StartRaceInput;
}>;


export type StartRaceMutation = { __typename?: 'Mutation', startRace: { __typename?: 'StartRacePayload', race?: { __typename?: 'Race', running: boolean, updatedAt: any } | null, errors?: Array<{ __typename?: 'InvalidRaceError', message: string, code: 'InvalidRaceError' } | { __typename?: 'NotAuthenticatedError', message: string, code: 'NotAuthenticatedError' } | { __typename?: 'NotAuthorizedError', message: string, code: 'NotAuthorizedError' }> | null } };

export type ByeQueryVariables = Exact<{ [key: string]: never; }>;


export type ByeQuery = { __typename?: 'Query', bye: string };

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = { __typename?: 'Query', allUsers: Array<{ __typename?: 'User', id: any, username: string, email: string }> };

export type GetRacesQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<RaceSortInput> | RaceSortInput>;
  where?: InputMaybe<RaceFilterInput>;
}>;


export type GetRacesQuery = { __typename?: 'Query', races?: { __typename?: 'RacesConnection', edges?: Array<{ __typename?: 'RacesEdge', node: { __typename?: 'Race', id: any, createdAt: any } }> | null } | null };

export type GetScoreQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
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


export type GetScoresQuery = { __typename?: 'Query', scores?: { __typename?: 'ScoresConnection', edges?: Array<{ __typename?: 'ScoresEdge', cursor: string, node: { __typename?: 'Score', id: any, wpm: number, rawWpm: number, accuracy: number, mode: string, modeSetting: number, content: string, createdAt: any, user?: { __typename?: 'User', username: string } | null } }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } | null };

export type GetUserByUsernameQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type GetUserByUsernameQuery = { __typename?: 'Query', userByUsername?: { __typename?: 'User', id: any, username: string, createdAt: any, updatedAt: any, scores: Array<{ __typename?: 'Score', id: any, wpm: number }> } | null };

export type GetUsersBestScoresQueryVariables = Exact<{
  userId: Scalars['UUID']['input'];
}>;


export type GetUsersBestScoresQuery = { __typename?: 'Query', usersBestScores: Array<{ __typename?: 'Score', wpm: number, mode: string, modeSetting: number, accuracy: number } | null> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: (
    { __typename?: 'User', id: any, username: string, email: string }
    & { ' $fragmentRefs'?: { 'UserInfoFragmentFragment': UserInfoFragmentFragment } }
  ) | null };

export type OnChatboxEventSubscriptionVariables = Exact<{
  chatboxId: Scalars['UUID']['input'];
}>;


export type OnChatboxEventSubscription = { __typename?: 'Subscription', onChatboxEvent: { __typename?: 'Chatbox', messages: Array<{ __typename?: 'Message', id: any, content: string, createdAt: any, author: { __typename?: 'User', username: string } }> } };

export type OnRaceJoinLeaveSubscriptionVariables = Exact<{
  raceId: Scalars['UUID']['input'];
}>;


export type OnRaceJoinLeaveSubscription = { __typename?: 'Subscription', onRaceJoinLeave: { __typename?: 'Race', mode: string, modeSetting: number, running: boolean, finished: boolean, content: string, chatboxId: any, racers: Array<{ __typename?: 'User', id: any, username: string }>, host: { __typename?: 'User', id: any, username: string } } };

export const UserInfoFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserInfoFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]} as unknown as DocumentNode<UserInfoFragmentFragment, unknown>;
export const CreateRaceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateRace"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateRaceInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRace"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"race"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"racers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"private"}}]}}]}}]}}]} as unknown as DocumentNode<CreateRaceMutation, CreateRaceMutationVariables>;
export const CreateScoreDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateScore"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateScoreInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createScore"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"score"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"wpm"}},{"kind":"Field","name":{"kind":"Name","value":"rawWpm"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"modeSetting"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateScoreMutation, CreateScoreMutationVariables>;
export const FinishRaceForUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"FinishRaceForUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FinishRaceForUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"finishRaceForUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"code"},"name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]} as unknown as DocumentNode<FinishRaceForUserMutation, FinishRaceForUserMutationVariables>;
export const FlipRunningStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"FlipRunningStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FlipRunningStatusInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"flipRunningStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"race"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"running"}}]}}]}}]}}]} as unknown as DocumentNode<FlipRunningStatusMutation, FlipRunningStatusMutationVariables>;
export const JoinChatboxDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"JoinChatbox"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"JoinChatboxInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"joinChatbox"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chatbox"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}}]}}]}}]} as unknown as DocumentNode<JoinChatboxMutation, JoinChatboxMutationVariables>;
export const JoinRaceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"JoinRace"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"JoinRaceInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"joinRace"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"race"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"racers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]}}]} as unknown as DocumentNode<JoinRaceMutation, JoinRaceMutationVariables>;
export const LeaveRaceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LeaveRace"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LeaveRaceInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"leaveRace"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"race"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"racers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]}}]} as unknown as DocumentNode<LeaveRaceMutation, LeaveRaceMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserInfoFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"code"},"name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserInfoFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"boolean"}}]}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RegisterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserInfoFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"code"},"name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserInfoFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const SendMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SendMessageInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"boolean"}}]}}]}}]} as unknown as DocumentNode<SendMessageMutation, SendMessageMutationVariables>;
export const StartRaceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"StartRace"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StartRaceInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startRace"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"race"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"running"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"code"},"name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]} as unknown as DocumentNode<StartRaceMutation, StartRaceMutationVariables>;
export const ByeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Bye"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bye"}}]}}]} as unknown as DocumentNode<ByeQuery, ByeQueryVariables>;
export const GetAllUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<GetAllUsersQuery, GetAllUsersQueryVariables>;
export const GetRacesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRaces"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"before"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"last"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"order"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RaceSortInput"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"RaceFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"races"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"before"},"value":{"kind":"Variable","name":{"kind":"Name","value":"before"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"last"},"value":{"kind":"Variable","name":{"kind":"Name","value":"last"}}},{"kind":"Argument","name":{"kind":"Name","value":"order"},"value":{"kind":"Variable","name":{"kind":"Name","value":"order"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetRacesQuery, GetRacesQueryVariables>;
export const GetScoreDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetScore"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"score"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"wpm"}},{"kind":"Field","name":{"kind":"Name","value":"rawWpm"}}]}}]}}]} as unknown as DocumentNode<GetScoreQuery, GetScoreQueryVariables>;
export const GetScoresDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetScores"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"before"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"last"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"order"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ScoreSortInput"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ScoreFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"scores"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"before"},"value":{"kind":"Variable","name":{"kind":"Name","value":"before"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"last"},"value":{"kind":"Variable","name":{"kind":"Name","value":"last"}}},{"kind":"Argument","name":{"kind":"Name","value":"order"},"value":{"kind":"Variable","name":{"kind":"Name","value":"order"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"wpm"}},{"kind":"Field","name":{"kind":"Name","value":"rawWpm"}},{"kind":"Field","name":{"kind":"Name","value":"accuracy"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"modeSetting"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}}]}}]}}]} as unknown as DocumentNode<GetScoresQuery, GetScoresQueryVariables>;
export const GetUserByUsernameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserByUsername"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userByUsername"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"scores"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"wpm"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetUserByUsernameQuery, GetUserByUsernameQueryVariables>;
export const GetUsersBestScoresDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUsersBestScores"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"usersBestScores"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"wpm"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"modeSetting"}},{"kind":"Field","name":{"kind":"Name","value":"accuracy"}}]}}]}}]} as unknown as DocumentNode<GetUsersBestScoresQuery, GetUsersBestScoresQueryVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserInfoFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserInfoFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const OnChatboxEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnChatboxEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatboxId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"onChatboxEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chatboxId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatboxId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<OnChatboxEventSubscription, OnChatboxEventSubscriptionVariables>;
export const OnRaceJoinLeaveDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnRaceJoinLeave"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"raceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"onRaceJoinLeave"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"raceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"raceId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"modeSetting"}},{"kind":"Field","name":{"kind":"Name","value":"racers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"host"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"running"}},{"kind":"Field","name":{"kind":"Name","value":"finished"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"chatboxId"}}]}}]}}]} as unknown as DocumentNode<OnRaceJoinLeaveSubscription, OnRaceJoinLeaveSubscriptionVariables>;