import { ArrowDropDown, ArrowDropUp, GitHub, Reddit, Twitter } from "@mui/icons-material";
import {
  Box,
  Chip,
  Grid,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import CountUp from "react-countup";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useParams } from "react-router-dom";

import Loading from "@app/components/Loading";
import { getCoinInfo } from "@app/services/crypto";
import { Crypto } from "@app/types/client";

const Cryptocurrency = () => {
  let { crypto } = useParams() as { crypto: string };
  const [coin, setCoin] = useState<Crypto>();

  useEffect(() => {
    getCoinInfo(crypto).then((res) => setCoin(res));
  }, [crypto]);

  const formattedPrice = useCallback((val: number) => val.toLocaleString(), []);

  if (!coin) return <Loading />;

  return (
    <>
      <Grid container sx={{ my: 3 }} spacing={3}>
        <Grid item xs={4}>
          <Chip
            size="small"
            label={
              <Typography variant="body2" fontWeight="bold">
                Rank: {coin.rank}
              </Typography>
            }
          />
          <Box display="flex" alignItems="center" gap={1}>
            <LazyLoadImage src={coin.img} alt={coin.name} height="40px" />
            <Typography variant="h5" my={1} fontWeight="bold">
              {coin.name}
            </Typography>
            <Typography fontWeight="bold" color="primary">
              {coin.symbol}
            </Typography>
            <Chip
              size="small"
              color={coin.priceChangePercentage24h >= 0 ? "success" : "error"}
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {coin.priceChangePercentage24h >= 0 ? (
                    <ArrowDropUp color="inherit" fontSize="large" />
                  ) : (
                    <ArrowDropDown color="inherit" fontSize="large" />
                  )}
                  {coin.priceChangePercentage24h}%
                </Box>
              }
            />
          </Box>
          <Typography variant="h3" mb={2}>
            $ <CountUp end={coin.currentPrice} duration={1} formattingFn={formattedPrice} />
          </Typography>
          <Box display="flex" gap={2} flexWrap="wrap">
            <Link href={coin.links.homepage} underline="none">
              <Chip label="Sitio web" sx={{ cursor: "pointer" }} />
            </Link>
            {coin.links.community.twitter && (
              <Link href={`https://twitter/${coin.links.community.twitter}`} underline="none">
                <Chip label="Twitter" sx={{ cursor: "pointer" }} icon={<Twitter />} />
              </Link>
            )}
            {coin.links.community.reddit && (
              <Link href={coin.links.community.reddit} underline="none">
                <Chip label={`Reddit`} sx={{ cursor: "pointer" }} icon={<Reddit />} />
              </Link>
            )}
            {coin.links.community.forum && (
              <Link href={coin.links.community.forum} underline="none">
                <Chip label={`Foro`} sx={{ cursor: "pointer" }} />
              </Link>
            )}
            {coin.links.community.github && (
              <Link href={coin.links.community.github} underline="none">
                <Chip label={`Github`} sx={{ cursor: "pointer" }} icon={<GitHub />} />
              </Link>
            )}
          </Box>
        </Grid>
        <Grid item xs={8}>
          <TableContainer component={Paper} sx={{ overflowY: "clip" }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell colSpan={2}>
                    <Typography fontWeight="bold">Información de {crypto}</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Cap. de mercado</TableCell>
                  <TableCell>
                    <Typography fontWeight="bold">$ {coin.marketCap}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Vol. de comercio(24h)</TableCell>
                  <TableCell>
                    <Typography fontWeight="bold">$ {coin.totalVolume24h}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Valoración tras la dilución total</TableCell>
                  <TableCell>
                    <Typography fontWeight="bold">
                      {coin.totalFullyDilutedValuation
                        ? `$ ${coin.totalFullyDilutedValuation}`
                        : "-"}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Cantidad circulante</TableCell>
                  <TableCell>
                    <Typography fontWeight="bold">{coin.circulatingQuantity}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Cantidad total</TableCell>
                  <TableCell>
                    <Typography fontWeight="bold">
                      {coin.totalSupply ? coin.totalSupply : "-"}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12}>
          <Chart
            type="line"
            height="400px"
            options={{
              xaxis: {
                labels: { show: false },
                axisBorder: { show: false },
                axisTicks: { show: false },
                crosshairs: { show: false },
                tooltip: { enabled: false },
              },
              yaxis: {
                decimalsInFloat: 0,
                labels: {
                  formatter: (val: number) => `$ ${val.toLocaleString()}`,
                },
              },
            }}
            series={[{ name: "Precio", data: coin.spakline7d }]}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Cryptocurrency;
