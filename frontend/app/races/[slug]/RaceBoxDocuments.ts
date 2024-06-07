import { gql } from "@apollo/client";

const Me = gql`
  query RaceBox_Me {
    me {
      id
      ...UserInfo
    }
  }
`;

const OnRaceEvent = gql`
  subscription RaceBox_OnRaceEvent($raceId: UUID!, $racersFirst: Int) {
    onRaceEvent(raceId: $raceId) {
      id
      mode
      modeSetting
      racers(first: $racersFirst) {
        edges {
          node {
            id
            user {
              id
              username
            }
            finished
            wpm
            wordsTyped
          }
        }
      }
      host {
        id
        username
      }
      running
      finished
      content
      chatboxId
      startTime
    }
  }
`;

const FinishRaceForUser = gql`
  mutation RaceBox_FinishRaceForUser($input: FinishRaceForUserInput!) {
    finishRaceForUser(input: $input) {
      racer {
        id
        finished
      }
      errors {
        code: __typename
        ... on Error {
          message
        }
      }
    }
  }
`;

const UpdateStats = gql`
  mutation RaceBox_UpdateStats($input: UpdateStatsInput!) {
    updateStats(input: $input) {
      racer {
        id
      }
      errors {
        code: __typename
        ... on Error {
          message
        }
      }
    }
  }
`;

const JoinRace = gql`
  mutation RaceBox_JoinRace($input: JoinRaceInput!) {
    joinRace(input: $input) {
      race {
        id
      }
      errors {
        code: __typename
        ... on Error {
          message
        }
      }
    }
  }
`;

const LeaveRace = gql`
  mutation RaceBox_LeaveRace($input: LeaveRaceInput!) {
    leaveRace(input: $input) {
      race {
        id
      }
    }
  }
`;

const CreateScore = gql`
  mutation RaceBox_CreateScore($input: CreateScoreInput!) {
    createScore(input: $input) {
      score {
        id
        wpm
        rawWpm
        mode
        modeSetting
        content
        language
        user {
          username
        }
      }
    }
  }
`;

const StartRace = gql`
  mutation RaceBox_StartRace($input: StartRaceInput!) {
    startRace(input: $input) {
      race {
        running
        updatedAt
      }
      errors {
        code: __typename
        ... on Error {
          message
        }
      }
    }
  }
`;

const DeleteRace = gql`
  mutation RaceBox_DeleteRace($input: DeleteRaceInput!) {
    deleteRace(input: $input) {
      result: boolean
      errors {
        code: __typename
        ... on Error {
          message
        }
      }
    }
  }
`;
