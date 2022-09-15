import { Center, Title } from "@mantine/core";

interface IProps {
  imgPath: string;
  label: string;
}

export const AppBanner: React.FC<IProps> = ({ imgPath, label }) => {
  return (
    <Center
      style={{
        height: 250,
        backgroundImage: `url(${imgPath})`,
        backgroundSize: "cover",
        borderRadius: 10,
      }}
      mb="md"
    >
      <Title size="h1" color="gray.7" data-testid="banner-title">
        {label}
      </Title>
    </Center>
  );
};
