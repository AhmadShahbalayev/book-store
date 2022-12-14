import {
  SimpleGrid,
  Text,
  Center,
  Button,
  Loader,
  Container,
  Paper,
} from "@mantine/core";
import { useQuery } from "@apollo/client";
import { useState } from "react";

import { AppBanner } from "../components/AppBanner";
import { AppCard } from "../components/AppCard";

import { GET_ALL_BOOKS } from "../graphql/book.query";
import { DP_PAGE_SIZE } from "../common/consts";
import { transformCachedDataToPageable } from "../common/utils";

export const Paginated: React.FC = () => {
  const [activePage, setPage] = useState(0);

  const { loading, error, data } = useQuery(GET_ALL_BOOKS, {
    variables: { limit: DP_PAGE_SIZE, skip: activePage * DP_PAGE_SIZE },
  });

  if (error) return <p>{error.message}</p>;

  return (
    <Paper>
      <AppBanner label="All programming books in one place!" />
      {loading ? (
        <Center sx={{ height: 250 }}>
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
            {transformCachedDataToPageable(
              data.all_book.items,
              activePage,
              DP_PAGE_SIZE
            ).map((item: any) => (
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
              disabled={data.all_book.total <= DP_PAGE_SIZE * (activePage + 1)}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </Button>
          </Center>
        </Container>
      )}
    </Paper>
  );
};
