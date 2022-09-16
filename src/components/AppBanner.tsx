import { Center, MediaQuery, Title } from "@mantine/core";

export const AppBanner: React.FC<{ label: string }> = ({ label }) => {
  return (
    <Center
      style={{
        height: 250,
        background: "linear-gradient(to bottom left, #0a3b61 0%, #000000 105%)",
        borderRadius: 10,
      }}
      mb="md"
      px="md"
    >
      <MediaQuery query="(max-width: 500px)" styles={{ fontSize: 20 }}>
        <Title
          align="center"
          size="h1"
          color="gray.3"
          data-testid="banner-title"
        >
          {label}
        </Title>
      </MediaQuery>
    </Center>
  );
};
