"use client";

import { ApolloClient, ApolloLink, HttpLink, Observable, SuspenseCache } from "@apollo/client";
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { PropsWithChildren } from "react";
import { setContext } from "@apollo/client/link/context";
import { getAccessToken, setAccessToken } from "@/accessToken";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwt_decode from "jwt-decode";

const httpLink = new HttpLink({
  uri: "http://localhost:5053/graphql",
  credentials: "include",
});

const authLink = setContext((_, { headers }) => {
  const token = getAccessToken();
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable((observer) => {
      let handle: any;
      Promise.resolve(operation)
        .then((operation) => {
          const accessToken = getAccessToken();
          if (accessToken) {
            operation.setContext({
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
          }
        })
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

const combinedLink = authLink.concat(httpLink);

function makeClient() {
  return new ApolloClient({
    cache: new NextSSRInMemoryCache(),
    // link:
    //   typeof window === "undefined"
    //     ? ApolloLink.from([new SSRMultipartLink({ stripDefer: true }), combinedLink])
    //     : combinedLink,
    link: ApolloLink.from([
      new TokenRefreshLink({
        accessTokenField: "accessToken", // has to match the name of the field we return in /refresh-token json
        isTokenValidOrUndefined: async () => {
          const token = getAccessToken();

          if (!token) {
            return false;
          }

          try {
            const { exp } = jwt_decode(token);
            return Date.now() < exp * 1000;
          } catch (err) {
            return false;
          }
        },
        fetchAccessToken: () => {
          return fetch("http://localhost:5053/refresh-token", { credentials: "include" });
        },
        handleFetch: (accessToken) => {
          setAccessToken(accessToken);
        },
        handleError: (err) => {
          // full control over handling token fetch Error
          console.warn("Your refresh token is invalid. Try to re-login");
          console.log("error:", err);
        },
      }),
      requestLink,
      combinedLink,
    ]),
    credentials: "include",
  });
}

function makeSuspenseCache() {
  return new SuspenseCache();
}

export function ApolloWrapper({ children }: PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient} makeSuspenseCache={makeSuspenseCache}>
      {children}
    </ApolloNextAppProvider>
  );
}
