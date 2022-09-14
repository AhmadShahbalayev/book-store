import { gql } from "@apollo/client";

export const GET_ALL_BOOKS = gql`
  query GetAllBooks($limit: Int, $skip: Int) {
    all_book(limit: $limit, skip: $skip) {
      items {
        title
        imageConnection {
          edges {
            node {
              url
            }
          }
        }
        url
      }
      total
    }
  }
`;
