import { useEffect, useState } from "react";
import { NetworkStatus, useQuery } from "@apollo/client";
import { SimpleGrid, Center, Loader, Container } from "@mantine/core";
import { useInView } from "react-intersection-observer";

import { AppBanner } from "../components/AppBanner";
import { AppCard } from "../components/AppCard";

import { GET_ALL_BOOKS } from "../graphql/book.query";
import { DIS_PAGE_SIZE } from "../common/consts";

export const InfiniteScroll: React.FC = () => {
  const [page, setPage] = useState(0);

  const { loading, error, data, networkStatus, fetchMore } = useQuery(
    GET_ALL_BOOKS,
    {
      variables: { limit: DIS_PAGE_SIZE, skip: 0 },
      onCompleted: () => setPage((prev) => prev + 1),
      fetchPolicy: "cache-and-network",
      notifyOnNetworkStatusChange: true,
    }
  );

  const isBooksReady = networkStatus === NetworkStatus.ready;

  const { ref: intersectorRef, inView } = useInView();

  useEffect(() => {
    if (
      inView &&
      isBooksReady &&
      data.all_book.items.length < data.all_book.total
    )
      fetchMore({
        variables: {
          limit: DIS_PAGE_SIZE,
          skip: page * DIS_PAGE_SIZE,
        },
      });
    // eslint-disable-next-line
  }, [inView]);

  if (error) return <p>{error.message}</p>;

  return (
    <>
      <AppBanner label="All programming books in one place!" />
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
          {data?.all_book.items.map((item: any) => (
            <AppCard
              title={item.title}
              image={item.imageConnection.edges[0].node.url}
              url={item.url}
              key={item.imageConnection.edges[0].node.url}
            />
          ))}
        </SimpleGrid>
        <div ref={intersectorRef} />
        {loading && (
          <Center sx={{ height: 100 }}>
            <Loader variant="bars" />
          </Center>
        )}
      </Container>
    </>
  );
};
