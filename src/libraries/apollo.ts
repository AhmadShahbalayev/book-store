import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: `https://graphql.contentstack.com/stacks/${process.env.REACT_APP_API_KEY}?environment=${process.env.NODE_ENV}`,
  headers: {
    access_token:
      process.env.NODE_ENV === "development"
        ? process.env.REACT_APP_ACCESS_TOKEN_DEVELOPMENT!
        : process.env.REACT_APP_ACCESS_TOKEN_PRODUCTION!,
  },
  cache: new InMemoryCache({
    typePolicies: {
      AllBook: {
        keyFields: [],
        fields: {
          items: {
            merge(existing: any = [], incoming: any, { readField }) {
              const merged = [...existing, ...incoming];

              return Array.from(
                new Map(merged.map((item) => [item.url, item])).values()
              );
            },
          },
        },
      },
    },
  }),
});
