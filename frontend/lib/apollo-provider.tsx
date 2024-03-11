"use client";

import { ApolloLink, HttpLink, HttpOptions, split } from "@apollo/client";
import {
  ApolloNextAppProvider,
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { PropsWithChildren } from "react";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import possibleTypes from "@/possibleTypes.json";

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
    uri: process.env["NEXT_PUBLIC_API_URL"],
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
    wsLink!,
    createHttpLink(cookie)
  );
};

function makeClient() {
  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache({
      possibleTypes,
    }),
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
