import { Card, Text, createStyles } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const useStyles = createStyles((theme, _params, getRef) => {
  const image = getRef("image");

  return {
    card: {
      position: "relative",
      height: 280,

      [`&:hover .${image}`]: {
        transform: "scale(1.03)",
      },
    },

    image: {
      ref: image,
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundSize: "cover",
      transition: "transform 500ms ease",
    },

    overlay: {
      position: "absolute",
      top: "20%",
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage:
        "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .85) 90%)",
    },

    content: {
      height: "100%",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      zIndex: 1,
    },

    title: {
      color: theme.white,
      marginBottom: 5,
    },
  };
});

interface IProps {
  image: string;
  title: string;
  url: string;
}

export const AppCard: React.FC<IProps> = ({ title, image, url }) => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  return (
    <Card
      p="lg"
      shadow="lg"
      className={classes.card}
      radius="md"
      style={{ cursor: "pointer" }}
      onClick={() => navigate(url)}
    >
      <div
        className={classes.image}
        style={{ backgroundImage: `url(${image})` }}
      />

      <div className={classes.overlay} />

      <div className={classes.content}>
        <Text size="lg" className={`${classes.title} line-clamp`} weight={500}>
          {title}
        </Text>
      </div>
    </Card>
  );
};
