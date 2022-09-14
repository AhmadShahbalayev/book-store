import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App";

import "./index.css";

const client = new ApolloClient({
  uri: `https://graphql.contentstack.com/stacks/${process.env.REACT_APP_API_KEY}?environment=${process.env.NODE_ENV}`,
  headers: {
    access_token: process.env.REACT_APP_ACCESS_TOKEN!,
  },
  cache: new InMemoryCache(),
});

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);
