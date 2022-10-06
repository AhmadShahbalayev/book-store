import {
  SimpleGrid,
  Text,
  Center,
  Button,
  Loader,
  Container,
  Paper,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { DP_PAGE_SIZE } from "../common/consts";
import { QUERY_KEYS } from "../common/queryKeys";

import { AppBanner } from "../components/AppBanner";
import { AppCard } from "../components/AppCard";
import { MachBooksService } from "../services/machBooks";

export const MachBooks: React.FC = () => {
  const [activePage, setPage] = useState(0);

  const { isLoading, isError, data } = useQuery(
    [QUERY_KEYS.MACH_BOOKS, activePage],
    () => MachBooksService.getBooks({ limit: DP_PAGE_SIZE, skip: activePage })
  );

  if (isError) return <p>Error occured...</p>;

  return (
    <Paper>
      <AppBanner label="All programming books in one place!" />
      {isLoading ? (
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
            {data.items.map((book: any) => (
              <AppCard
                title={book.title}
                image={book.image}
                url={book.id}
                key={book.id}
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
              disabled={data.total <= DP_PAGE_SIZE * (activePage + 1)}
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
