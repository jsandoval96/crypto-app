import { Search } from "@mui/icons-material";
import { Box, Grid, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { useState } from "react";

import NewsCard from "@app/components/News";
import { useNews } from "@app/hooks/useNews";

const News = () => {
  const { news, findNews } = useNews(20);
  const [text, setText] = useState("");

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        flexWrap="wrap"
        justifyContent={{ xs: "center", sm: "space-between" }}
        mb={{ xs: 2, sm: 0 }}
      >
        <Typography variant="h5" my={3} fontWeight="bold">
          Últimas noticias
        </Typography>
        <TextField
          label="Búsqueda..."
          size="small"
          value={text}
          onChange={({ target }) => setText(target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => findNews(text)}>
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Grid container spacing={2}>
        {news.map((item) => (
          <Grid
            item
            key={item.title}
            xs={12}
            sm={6}
            md={3}
            lg={2}
            display="flex"
            justifyContent="center"
          >
            <NewsCard
              title={item.title}
              img={item.img}
              description={item.description}
              link={item.url}
              maxWidth={300}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default News;
