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
