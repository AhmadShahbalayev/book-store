import { Center, MediaQuery, Title } from "@mantine/core";

export const AppBanner: React.FC<{ label: string }> = ({ label }) => {
  return (
    <Center
      sx={(theme) => ({
        height: 250,
        background:
          theme.colorScheme === "dark"
            ? theme.fn.linearGradient(45, "#0a3b61", "#83161c")
            : theme.fn.linearGradient(45, "red", "blue"),
        borderRadius: 10,
      })}
      mb="md"
      px="md"
    >
      <MediaQuery smallerThan="sm" styles={{ fontSize: 20 }}>
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
