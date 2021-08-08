import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
  } from "@apollo/client";
   //const api = "http://192.168.0.104:4000";
  const api = "http://localhost:4000";

  export const client = new ApolloClient({
    uri: api,
    cache: new InMemoryCache()
  });