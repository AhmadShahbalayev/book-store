import { Burger, Header, MediaQuery, Image, Title, Group } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";

interface IProps {
  opened: boolean;
  setOpened: () => void;
  burgerColor: string;
  imgPath: string;
  title: string;
}

export const AppHeader: React.FC<IProps> = ({
  opened,
  setOpened,
  burgerColor,
  imgPath,
  title,
}) => {
  const navigate = useNavigate();

  return (
    <Header height={70} p="md">
      <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={opened}
            onClick={setOpened}
            size="sm"
            color={burgerColor}
            mr="xl"
          />
        </MediaQuery>
        <Group onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          <Image width={50} height={50} src={imgPath} alt="Logo" />
          <Title size="h3" color="gray.7">
            {title}
          </Title>
        </Group>
      </div>
    </Header>
  );
};
