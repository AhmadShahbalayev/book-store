import {
  Text,
  Image,
  Title,
  Grid,
  Col,
  Anchor,
  Button,
  Group,
  LoadingOverlay,
  createStyles,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { jsonToHtml } from "@contentstack/json-rte-serializer";
import { QUERY_KEYS } from "../common/queryKeys";
import { BookDetailsService } from "../services/bookDetails";
import { AuthorService } from "../services/authorDetails";

export const BookDetails: React.FC = () => {
  const { url } = useParams();
  const navigate = useNavigate();

  const {
    isLoading,
    isError,
    data: books,
  } = useQuery(
    [QUERY_KEYS.BOOK_DETAILS],
    () => BookDetailsService.getBookDetails(url),
    { queryHash: url }
  );

  const authourId = books?.entries?.[0].author?.[0].uid;

  const { data: authorDetails } = useQuery(
    [QUERY_KEYS.AUTHOR_DETAILS],
    () => AuthorService.getAuthorDetails(authourId),
    { enabled: !!authourId }
  );

  if (isLoading) return <LoadingOverlay visible overlayBlur={1} />;
  if (isError) return <p>Error occured!</p>;

  const { title, amazon_url, pages, description, image } = books.entries[0];

  const serializedDescription = jsonToHtml(description);

  return (
    <Grid gutter={50}>
      <Grid.Col md={6} lg={3}>
        <Image src={image.url} alt={title} mb="xl" />
        <Group mb="xl">
          <Text>{authorDetails?.entry?.title}</Text>
          <Text>{pages} Pages</Text>
        </Group>
        <Group>
          <Button variant="outline" onClick={() => navigate(-1)}>
            Go back
          </Button>
          <Anchor href={amazon_url.href} target="_blank">
            <Button>Buy now!</Button>
          </Anchor>
        </Group>
      </Grid.Col>
      <Grid.Col md={6} lg={8}>
        <Title size="h1" mb="xl">
          {title}
        </Title>
        <div dangerouslySetInnerHTML={{ __html: serializedDescription }} />
      </Grid.Col>
    </Grid>
  );
};
