import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";

import notFoundImg from "@app/assets/image-not-found.png";

const News = ({ title, img, description, link, maxWidth = 250 }: NewsProps) => {
  return (
    <Card sx={{ maxWidth, height: "100%" }}>
      <CardMedia
        component="img"
        height="140"
        image={img || notFoundImg}
        alt="green iguana"
        sx={{ objectFit: "contain" }}
      />
      <CardContent sx={{ height: 203 }}>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 5,
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
          }}
        >
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={{ mt: "auto" }}>
        <Button size="small" href={link} target="__blank">
          Leer más
        </Button>
      </CardActions>
    </Card>
  );
};

interface NewsProps {
  title: string;
  img: string;
  description: string;
  link: string;
  maxWidth?: number;
}

export default News;
