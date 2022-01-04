import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-skyblue.min.css";
import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import News from "@app/components/News";
import TrendingCard from "@app/components/TrendingCard";
import { getCoinsPaginated, getCoinsTrending, getGlobalStats } from "@app/services/crypto";
import { getNews } from "@app/services/news";

const MiniChart = React.lazy(() => import("@app/components/Charts/LineChart"));

const Home = () => {
  const theme = useTheme();
  const [globalStats, setGlobalStats] = useState<GlobalStats>();
  const [coins, setCoins] = useState<Coin[]>([]);
  const [trendingCoins, setTrendingCoins] = useState<CoinSimple[]>([]);
  const [news, setNews] = useState<News[]>([]);
  const capMarketWentUp = globalStats?.marketCapChangePercentage24h ?? 0 >= 0;

  useEffect(() => {
    const fetchData = async () => {
      const [stats, coins, trending, news] = await Promise.all([
        getGlobalStats(),
        getCoinsPaginated(),
        getCoinsTrending(),
        getNews({ search: "cryto", limit: 5, lang: "es-ES" }),
      ]);

      setGlobalStats(stats);
      setCoins(coins);
      setTrendingCoins(trending);
      setNews(news);
    };

    fetchData();
  }, []);

  return (
    <>
      <Stack
        spacing={{ xs: 0, sm: 3 }}
        direction={{ xs: "column", sm: "row" }}
        my={1}
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
      >
        <Box display="flex" gap={0.5}>
          <Typography fontWeight="bold" variant="body2">
            Monedas:
          </Typography>
          <Typography color="primary" variant="body2">
            {globalStats?.activeCryptocurrencies}
          </Typography>
        </Box>
        <Box display="flex" gap={0.5}>
          <Typography fontWeight="bold" variant="body2">
            Intercambios:
          </Typography>
          <Typography color="primary" variant="body2">
            {globalStats?.exchanges}
          </Typography>
        </Box>
        <Box display="flex" gap={0.5}>
          <Typography fontWeight="bold" variant="body2">
            Cap. de mercado:
          </Typography>
          <Typography color="primary" variant="body2">
            $ {globalStats?.totalMarketCap}
          </Typography>
          <Box display="flex" alignItems="center">
            {capMarketWentUp ? (
              <ArrowDropUp color="success" fontSize="small" />
            ) : (
              <ArrowDropDown color="error" fontSize="small" />
            )}
            <Typography variant="caption" color={capMarketWentUp ? "success.main" : "error.main"}>
              {globalStats?.marketCapChangePercentage24h}%
            </Typography>
          </Box>
        </Box>
        <Box display="flex" gap={0.5}>
          <Typography fontWeight="bold" variant="body2">
            Vol. de mercado(24h):
          </Typography>
          <Typography color="primary" variant="body2">
            $ {globalStats?.totalVolume24h}
          </Typography>
        </Box>
        <Box display="flex" gap={0.5}>
          <Typography fontWeight="bold" variant="body2">
            Dominio del bitcoin:
          </Typography>
          <Typography color="primary" variant="body2">
            {globalStats?.marketDomainBtc}%
          </Typography>
        </Box>
      </Stack>
      <Divider />
      <Typography variant="h5" my={2} fontWeight="bold">
        Monedas en tendencia
      </Typography>
      <Grid container spacing={2}>
        {trendingCoins.map((coin, idx) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
            <TrendingCard
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
                <MiniChart data={coin.priceIn7days} />
              </React.Suspense>
            </TrendingCard>
          </Grid>
        ))}
      </Grid>
      {/* <Typography variant="h5" fontWeight="bold" my={3}>
        Precios de las criptomonedas según la capitalización de mercado
      </Typography>
      <TableContainer component={Paper} sx={{ overflowY: "clip" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>#</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Moneda</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Precio</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>1h</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>24h</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>7d</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Volumen 24h</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Cap. mercado</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Últimos 7 días</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {coins.map((coin: Coin) => (
              <TableRow key={coin.rank}>
                <TableCell>{coin.rank}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <LazyLoadImage src={coin.img} alt={coin.name} height="25px" />
                    <Typography>{coin.name}</Typography>
                    <Typography fontWeight="bold" color="primary">
                      {coin.symbol}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography fontWeight="bold" variant="subtitle2">
                    $ {coin.price}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    {coin.priceChangePercentage1h >= 0 ? (
                      <ArrowDropUp color="success" fontSize="large" />
                    ) : (
                      <ArrowDropDown color="error" fontSize="large" />
                    )}
                    <Typography
                      color={coin.priceChangePercentage1h >= 0 ? "success.main" : "error.main"}
                    >
                      {coin.priceChangePercentage1h}%
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    {coin.priceChangePercentage24h >= 0 ? (
                      <ArrowDropUp color="success" fontSize="large" />
                    ) : (
                      <ArrowDropDown color="error" fontSize="large" />
                    )}
                    <Typography
                      color={coin.priceChangePercentage24h >= 0 ? "success.main" : "error.main"}
                    >
                      {coin.priceChangePercentage24h}%
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    {coin.priceChangePercentage7d >= 0 ? (
                      <ArrowDropUp color="success" fontSize="large" />
                    ) : (
                      <ArrowDropDown color="error" fontSize="large" />
                    )}
                    <Typography
                      color={coin.priceChangePercentage7d >= 0 ? "success.main" : "error.main"}
                    >
                      {coin.priceChangePercentage7d}%
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">$ {coin.volume}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">$ {coin.marketCap}</Typography>
                </TableCell>
                <TableCell sx={{ p: 1, maxWidth: 100 }}>
                  <React.Suspense
                    fallback={
                      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <CircularProgress />
                      </Box>
                    }
                  >
                    <MiniChart data={coin.priceIn7days} />
                  </React.Suspense>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
      {/* <Typography variant="h5" my={2} fontWeight="bold">
        Últimas noticias
      </Typography>
      <Splide
        options={{
          perPage: 1,
          type: "loop",
          gap: "1rem",
          pagination: false,
          padding: "1rem 1rem",
          breakpoints: {
            [theme.breakpoints.values.sm]: { perPage: 1 },
            [theme.breakpoints.values.md]: { perPage: 2 },
            [theme.breakpoints.values.lg]: { perPage: 3 },
            [theme.breakpoints.values.xl]: { perPage: 4 },
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
      </Splide> */}
    </>
  );
};

interface GlobalStats {
  activeCryptocurrencies: number;
  totalMarketCap: number | string;
  totalVolume24h: number | string;
  marketCapChangePercentage24h: string;
  marketDomainBtc: number;
  exchanges: number;
}

interface CoinSimple {
  name: string;
  symbol: string;
  img: string;
  price: number;
  priceChangePercentage7d: number | string;
  priceIn7days: number[];
}

interface Coin extends CoinSimple {
  rank: number;
  marketCap: number | string;
  volume: number | string;
  priceChangePercentage1h: number | string;
  priceChangePercentage24h: number | string;
}

interface News {
  title: string;
  url: string;
  description: string;
  img: string;
  date: string;
  provider: {
    name: string;
    img: string;
  };
}

export default Home;
