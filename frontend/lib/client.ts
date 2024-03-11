import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import { ApolloClient, HttpLink, HttpOptions, InMemoryCache } from "@apollo/client";
import { headers } from "next/headers";
import possibleTypes from "@/possibleTypes.json";

const createHttpLink = (cookie?: string | null) => {
  const options: HttpOptions = {
    uri: process.env["NEXT_PUBLIC_API_URL"],
    credentials: "include",
    ...(cookie && { headers: { cookie } }),
  };
  return new HttpLink(options);
};

export const { getClient }: { getClient: () => ApolloClient<any> } = registerApolloClient(() => {
  const cookie = headers().get("cookie");
  return new ApolloClient({
    cache: new InMemoryCache({
      possibleTypes,
    }),
    link: createHttpLink(cookie),
    credentials: "include",
    ...(cookie && { headers: { cookie } }),
  });
});

/*
 * The code below was useful when the website was using JWT for authentication.
 * It seems way too difficult to deal with once we try and implement SSR, unless
 * the JWT is stored in the cookie (which then in some way defeats the purpose)
 */

// const httpLink = new HttpLink({
//   uri: "http://localhost:5053/graphql", // TODO: .env?
//   credentials: "include",
// });
//
// const authLink = setContext((_, { headers }) => {
//   const token = getAccessToken();
//   return {
//     headers: {
//       ...headers,
//       Authorization: token ? `Bearer ${token}` : "",
//     },
//   };
// });
//
// const combinedLink = authLink.concat(httpLink);
//
// const requestLink = new ApolloLink(
//   (operation, forward) =>
//     new Observable((observer) => {
//       let handle: any;
//       Promise.resolve(operation)
//         .then((operation) => {
//           const accessToken = getAccessToken();
//           if (accessToken) {
//             operation.setContext({
//               headers: {
//                 Authorization: `Bearer ${accessToken}`,
//               },
//             });
//           }
//         })
//         .then(() => {
//           handle = forward(operation).subscribe({
//             next: observer.next.bind(observer),
//             error: observer.error.bind(observer),
//             complete: observer.complete.bind(observer),
//           });
//         })
//         .catch(observer.error.bind(observer));
//
//       return () => {
//         if (handle) handle.unsubscribe();
//       };
//     })
// );
//
// export const { getClient }: { getClient: () => ApolloClient<any> } = registerApolloClient(() => {
//   return new ApolloClient({
//     link: ApolloLink.from([
//       new TokenRefreshLink({
//         accessTokenField: "accessToken", // has to match the name of the field we return in /refresh-token json
//         isTokenValidOrUndefined: async () => {
//           const token = getAccessToken();
//
//           if (!token) {
//             return false;
//           }
//
//           try {
//             const { exp } = jwt_decode(token);
//             return Date.now() < exp * 1000;
//           } catch (err) {
//             return false;
//           }
//         },
//         fetchAccessToken: () => {
//           return fetch("http://localhost:5053/refresh-token", { credentials: "include" });
//         },
//         handleFetch: (accessToken) => {
//           setAccessToken(accessToken);
//         },
//         handleError: (err) => {
//           // full control over handling token fetch Error
//           console.warn("Your refresh token is invalid. Try to re-login");
//           console.error(err);
//         },
//       }),
//       requestLink,
//       combinedLink,
//     ]),
//     cache: new InMemoryCache(),
//     credentials: "include",
//   });
// });
