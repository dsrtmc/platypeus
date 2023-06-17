import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import {ApolloClient, HttpLink, InMemoryCache} from "@apollo/client";

export const { getClient } = registerApolloClient(() => {
    return new ApolloClient({
        cache: new InMemoryCache(),
        link: new HttpLink({
            uri: "http://localhost:5053/graphql"
        })
    })
});