import {
  SimpleGrid,
  Text,
  Center,
  Button,
  Loader,
  Container,
} from "@mantine/core";
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";

import { Banner } from "../components/Banner";
import { AppCard } from "../components/AppCard";

import hero from "../assets/images/hero.jpg";

export const Paginated: React.FC = () => {
  const BOOKS = gql`
    query GetAllPaginatedBooks($limit: Int!, $skip: Int!) {
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

  const PAGE_SIZE = 4;
  const [activePage, setPage] = useState(0);

  const { loading, error, data } = useQuery(BOOKS, {
    variables: { limit: PAGE_SIZE, skip: activePage * PAGE_SIZE },
  });

  if (error) return <p>{error.message}</p>;

  return (
    <>
      <Banner imgPath={hero} label="All programming books in one place!" />
      {loading ? (
        <Center style={{ height: 250 }}>
          <Loader variant="bars" />
        </Center>
      ) : (
        <Container>
          <SimpleGrid
            breakpoints={[
              { minWidth: "lg", cols: 4, spacing: "xl" },
              { minWidth: "md", cols: 3, spacing: "xl" },
              { minWidth: "sm", cols: 2, spacing: "xl" },
              { minWidth: "xs", cols: 2, spacing: "xl" },
            ]}
            mb="xl"
          >
            {data.all_book.items.map((item: any) => (
              <AppCard
                title={item.title}
                image={item.imageConnection.edges[0].node.url}
                url={item.url}
                key={item.imageConnection.edges[0].node.url}
              />
            ))}
          </SimpleGrid>
          <Center>
            <Button
              disabled={!activePage}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Previous
            </Button>
            <Text mr="xl" ml="xl">
              {activePage + 1}
            </Text>
            <Button
              disabled={data.all_book.total <= PAGE_SIZE * (activePage + 1)}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </Button>
          </Center>
        </Container>
      )}
    </>
  );
};
