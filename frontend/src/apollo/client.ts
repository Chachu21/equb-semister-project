import { ApolloClient, InMemoryCache } from "@apollo/client";

// Replace with your Hasura endpoint and admin secret (store securely in environment variables)
const hasuraEndpoint = "http://localhost:8080/v1/graphql";
const hasuraAdminSecret = "mysecret";
const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: hasuraEndpoint,
  cache,
  headers: {
    Authorization: hasuraAdminSecret ? `Bearer ${hasuraAdminSecret}` : "",
  },
});

export default client;
