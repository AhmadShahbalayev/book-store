import { gql, useQuery } from "@apollo/client";
import { SimpleGrid, Center, Loader, Container } from "@mantine/core";

import { Banner } from "../components/Banner";
import { AppCard } from "../components/AppCard";

import hero from "../assets/images/hero.jpg";

export const InfiniteScroll: React.FC = () => {
  const BOOKS = gql`
    query GetAllInfiniteBooks {
      all_book {
        items {
          title
          imageConnection {
            edges {
              node {
                url
              }
            }
          }
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(BOOKS);

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
        </Container>
      )}
    </>
  );
};
