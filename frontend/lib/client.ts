import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, Observable } from "@apollo/client";
import { getAccessToken, setAccessToken } from "@/accessToken";
import { setContext } from "@apollo/client/link/context";
import jwt_decode from "jwt-decode";

const httpLink = new HttpLink({
  uri: "http://localhost:5053/graphql", // TODO: .env?
  credentials: "include",
});

const authLink = setContext((_, { headers }) => {
  const token = getAccessToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const combinedLink = authLink.concat(httpLink);

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

export const { getClient }: { getClient: () => ApolloClient<any> } = registerApolloClient(() => {
  console.log("when using the getClient, my access token is:", getAccessToken());
  return new ApolloClient({
    // link: authLink.concat(httpLink),
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
            return Date.now() >= exp * 1000;
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
        handleResponse: (_operation, _accessTokenField) => (_response) => {
          // here you can parse response, handle errors, prepare returned token to further operations
          // returned object should be like this:
          // { access_token: 'token string here' }
        },
        handleError: (err) => {
          // full control over handling token fetch Error
          console.warn("Your refresh token is invalid. Try to re-login");
          console.error(err);
        },
      }),
      requestLink,
      combinedLink,
    ]),
    cache: new InMemoryCache(),
    credentials: "include",
  });
});
