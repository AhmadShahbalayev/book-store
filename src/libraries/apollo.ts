import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: `https://graphql.contentstack.com/stacks/${process.env.REACT_APP_API_KEY}?environment=${process.env.NODE_ENV}`,
  headers: {
    access_token: process.env.REACT_APP_ACCESS_TOKEN_PRODUCTION!,
  },
  cache: new InMemoryCache(),
});
