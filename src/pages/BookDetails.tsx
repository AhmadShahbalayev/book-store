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
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { jsonToHtml } from "@contentstack/json-rte-serializer";

export const BookDetails: React.FC = () => {
  const { url } = useParams();

  const {
    isLoading,
    isError,
    data: books,
  } = useQuery(
    ["BOOK_DETAILS"],
    () =>
      fetch(
        `https://cdn.contentstack.io/v3/content_types/book/entries?environment=development&query={"url": "/${url}"}`,
        {
          headers: {
            api_key: process.env.REACT_APP_API_KEY!,
            access_token:
              process.env.NODE_ENV == "development"
                ? process.env.REACT_APP_ACCESS_TOKEN_DEVELOPMENT!
                : process.env.REACT_APP_ACCESS_TOKEN_PRODUCTION!,
          },
        }
      ).then((res) => res.json()),
    { queryHash: url }
  );

  const authourId = books?.entries && books.entries[0].author[0].uid;

  const { data: authorDetails } = useQuery(
    ["AUTHOER_DETAILS"],
    () =>
      fetch(
        `https://cdn.contentstack.io/v3/content_types/author/entries/${authourId}?environment=development`,
        {
          headers: {
            api_key: process.env.REACT_APP_API_KEY!,
            access_token:
              process.env.NODE_ENV == "development"
                ? process.env.REACT_APP_ACCESS_TOKEN_DEVELOPMENT!
                : process.env.REACT_APP_ACCESS_TOKEN_PRODUCTION!,
          },
        }
      ).then((res) => res.json()),
    { enabled: !!authourId }
  );

  const navigate = useNavigate();

  if (isLoading) return <LoadingOverlay visible overlayBlur={1} />;
  if (isError) return <p>Error occured!</p>;

  const { title, amazon_url, pages, description, image } = books.entries[0];

  const serializedDescription = jsonToHtml(description);

  return (
    <Grid>
      <Col span="content" mr="xl">
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
      </Col>
      <Col span={6}>
        <Title size="h1" mb="xl">
          {title}
        </Title>
        <div dangerouslySetInnerHTML={{ __html: serializedDescription }} />
      </Col>
    </Grid>
  );
};
