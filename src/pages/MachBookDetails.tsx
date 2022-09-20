import {
  Text,
  Image,
  Title,
  Grid,
  Anchor,
  Button,
  Group,
  LoadingOverlay,
} from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "../common/queryKeys";
import { MachBooksService } from "../services/machBooks";

export const MachBookDetails: React.FC = () => {
  const { url } = useParams();
  const navigate = useNavigate();

  const { isLoading, isError, data } = useQuery(
    [QUERY_KEYS.MACH_BOOK_DETAILS],
    () => MachBooksService.getBookDetails(url!),
    { queryHash: url }
  );

  if (isLoading) return <LoadingOverlay visible overlayBlur={1} />;
  if (isError) return <p>Error occured!</p>;

  const { title, image, description, amazonUrl, author } = data;

  return (
    <Grid gutter={50}>
      <Grid.Col md={6} lg={3}>
        <Image src={image} alt={title} mb="xl" />
        <Group mb="xl">
          <Text>Author: {author}</Text>
        </Group>
        <Group>
          <Button variant="outline" onClick={() => navigate(-1)}>
            Go back
          </Button>
          <Anchor href={amazonUrl} target="_blank">
            <Button>Buy now!</Button>
          </Anchor>
        </Group>
      </Grid.Col>
      <Grid.Col md={6} lg={8}>
        <Title size="h1" mb="xl">
          {title}
        </Title>
        <Text>{description}</Text>
      </Grid.Col>
    </Grid>
  );
};
