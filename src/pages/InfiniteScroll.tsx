import { useQuery } from "@apollo/client";
import { SimpleGrid, Center, Loader, Container } from "@mantine/core";
import { useEffect, useRef, useState } from "react";

import { AppBanner } from "../components/AppBanner";
import { AppCard } from "../components/AppCard";

import hero from "../assets/images/hero.jpg";
import { GET_ALL_BOOKS } from "../graphql/queries/book.query";

const PAGE_SIZE = 10;

export const InfiniteScroll: React.FC = () => {
  const [page, setPage] = useState(0);

  const { loading, error, data, fetchMore } = useQuery(GET_ALL_BOOKS, {
    variables: { limit: PAGE_SIZE, skip: 0 },
    onCompleted: () => setPage((prev) => prev + 1),
    fetchPolicy: "cache-and-network",
  });

  const intersectorRef = useRef<any>(null);

  const options: IntersectionObserverInit = {
    rootMargin: "0px",
    threshold: 1,
  };

  useEffect(() => {
    const io = new IntersectionObserver((changes) => {
      const target = changes[0];

      if (
        target.isIntersecting &&
        data.all_book.items.length < data.all_book.total
      )
        fetchMore({
          variables: { limit: PAGE_SIZE, skip: page * PAGE_SIZE },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            if (!fetchMoreResult) return previousResult;

            return {
              all_book: {
                __typename: "AllBook",
                items: [
                  ...previousResult.all_book.items,
                  ...fetchMoreResult.all_book.items,
                ],
                total: previousResult.all_book.total,
              },
            };
          },
        });
    }, options);

    if (intersectorRef.current) io.observe(intersectorRef.current);

    return () => {
      if (intersectorRef.current) io.unobserve(intersectorRef.current);
    };
  }, [page]);

  if (error) return <p>{error.message}</p>;

  return (
    <>
      <AppBanner imgPath={hero} label="All programming books in one place!" />
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
          <Center style={{ height: 250 }}>
            <Loader variant="bars" />
          </Center>
        )}
      </Container>
    </>
  );
};
