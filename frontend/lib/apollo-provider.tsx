"use client";

import { ApolloClient, ApolloLink, HttpLink, HttpOptions, split } from "@apollo/client";
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { PropsWithChildren } from "react";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

const wsLink =
  typeof window !== "undefined"
    ? new GraphQLWsLink(
        createClient({
          url: "wss://localhost:7218/graphql",
        })
      )
    : null;

const createHttpLink = (cookie = "") => {
  const options: HttpOptions = {
    uri: "http://localhost:5053/graphql",
    credentials: "include",
    ...(cookie && { cookie }),
  };
  return new HttpLink(options);
};

const createSplitLink = (cookie = "") => {
  return split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return definition.kind === "OperationDefinition" && definition.operation === "subscription";
    },
    wsLink,
    createHttpLink(cookie)
  );
};

function makeClient() {
  return new ApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window !== "undefined" && wsLink
        ? createSplitLink()
        : ApolloLink.from([new SSRMultipartLink({ stripDefer: true }), createHttpLink()]),
    credentials: "include",
  });
}

export function ApolloWrapper({ children }: PropsWithChildren) {
  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>;
}
