import { Box, Button, CircularProgress, Grid, Typography, useTheme } from "@mui/material";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-skyblue.min.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import CryptoCard from "@app/components/CryptoCard";
import ExchangeCard from "@app/components/ExchangeCard";
import Loading from "@app/components/Loading";
import News from "@app/components/News";
import { useCoins } from "@app/hooks/useCoins";
import { useNews } from "@app/hooks/useNews";
import { getCoinsTrending } from "@app/services/crypto";
import { getExchanges } from "@app/services/exchanges";
import { CoinSimple, Exchange } from "@app/types/client";

const MiniChart = React.lazy(() => import("@app/components/Charts/LineChart"));

const Home = () => {
  const theme = useTheme();
  const { news } = useNews(12);
  const { coins } = useCoins(15);
  const [loading, setLoading] = useState<boolean>(true);
  const [trendingCoins, setTrendingCoins] = useState<CoinSimple[]>([]);
  const [exchanges, setExchanges] = useState<Exchange[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [trending, exchanges] = await Promise.all([getCoinsTrending(), getExchanges(10)]);

      setTrendingCoins(trending);
      setExchanges(exchanges);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <Typography variant="h5" my={3} fontWeight="bold">
        Monedas en tendencia
      </Typography>
      <Grid container spacing={2}>
        {trendingCoins.map((coin, idx) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
            <Link to={`/cryptocurrency/${coin.id}`} style={{ textDecoration: "none" }}>
              <CryptoCard
                name={coin.name}
                value={coin.price}
                img={coin.img}
                percent={coin.priceChangePercentage7d}
              >
                <React.Suspense
                  fallback={
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <CircularProgress />
                    </Box>
                  }
                >
                  <MiniChart
                    data={coin.priceIn7days}
                    isPositive={coin.priceChangePercentage7d >= 0}
                  />
                </React.Suspense>
              </CryptoCard>
            </Link>
          </Grid>
        ))}
      </Grid>
      <Box display="flex" my={3}>
        <Typography variant="h5" fontWeight="bold">
          Top 15 criptomonedas
        </Typography>
        <Link to="/cryptocurrencies" style={{ marginLeft: "auto", textDecoration: "none" }}>
          <Button variant="text">Ver más</Button>
        </Link>
      </Box>
      <Grid container spacing={2}>
        {coins.map((coin, idx) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
            <Link to={`/cryptocurrency/${coin.id}`} style={{ textDecoration: "none" }}>
              <CryptoCard
                name={coin.name}
                value={coin.price}
                img={coin.img}
                percent={coin.priceChangePercentage7d}
                rank={coin.rank}
              >
                <React.Suspense
                  fallback={
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <CircularProgress />
                    </Box>
                  }
                >
                  <MiniChart
                    data={coin.priceIn7days}
                    isPositive={coin.priceChangePercentage7d >= 0}
                  />
                </React.Suspense>
              </CryptoCard>
            </Link>
          </Grid>
        ))}
      </Grid>
      <Box display="flex" my={3}>
        <Typography variant="h5" fontWeight="bold">
          Exchanges populares
        </Typography>
        <Link to="/exchanges" style={{ marginLeft: "auto", textDecoration: "none" }}>
          <Button variant="text">Ver más</Button>
        </Link>
      </Box>
      <Grid container spacing={2}>
        {exchanges.map((exchange, idx) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
            <a href={exchange.url} style={{ textDecoration: "none" }}>
              <ExchangeCard
                name={exchange.name}
                img={exchange.img}
                rank={exchange.trustRank}
                trustScore={exchange.trustScore}
                volume24h={exchange.trading24hVolumeBtc}
              />
            </a>
          </Grid>
        ))}
      </Grid>
      <Box display="flex" my={3}>
        <Typography variant="h5" fontWeight="bold">
          Últimas noticias
        </Typography>
        <Link to="/news" style={{ marginLeft: "auto", textDecoration: "none" }}>
          <Button variant="text">Ver más</Button>
        </Link>
      </Box>
      <Splide
        options={{
          perPage: 5,
          type: "loop",
          gap: "1rem",
          pagination: false,
          padding: "1rem 1rem",
          breakpoints: {
            [theme.breakpoints.values.sm]: { perPage: 1 },
            [theme.breakpoints.values.md]: { perPage: 2 },
            [theme.breakpoints.values.lg]: { perPage: 3 },
            [theme.breakpoints.values.xl]: { perPage: 5 },
          },
        }}
      >
        {news.map((item, idx) => (
          <SplideSlide key={idx}>
            <News
              title={item.title}
              img={item.img}
              description={item.description}
              link={item.url}
            />
          </SplideSlide>
        ))}
      </Splide>
    </>
  );
};

export default Home;
