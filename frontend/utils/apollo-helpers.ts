import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { HttpLink, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";

export const wsLink = new GraphQLWsLink(
  createClient({
    url: "wss://localhost:7218/graphql",
    // connectionParams: {
    //   authToken: user.authToken // JUST A NOTE
    // }
  })
);

export const createHttpLink = (cookie) => {
  return new HttpLink({
    uri: "http://localhost:5053/graphql",
    credentials: "include",
    headers: {
      cookie,
    },
  });
};

export const createSplitLink = (cookie = "") => {
  return split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return definition.kind === "OperationDefinition" && definition.operation === "subscription";
    },
    wsLink,
    createHttpLink(cookie)
  );
};
