import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import {
  Box,
  Chip,
  CircularProgress,
  MenuItem,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

import Loading from "@app/components/Loading";
import { useCoins } from "@app/hooks/useCoins";
import { Coin } from "@app/types/client";

const MiniChart = React.lazy(() => import("@app/components/Charts/LineChart"));

const Cryptocurrencies = () => {
  const { coins, loading, currentPage, perPage, setPage, setPerPage } = useCoins(30);

  if (loading) return <Loading />;

  return (
    <>
      <Box display="flex" mb={2} my={3} flexWrap="wrap">
        <Typography variant="h5" fontWeight="bold">
          Precios de las criptomonedas según la capitalización de mercado
        </Typography>
        <TextField
          label="Por Página"
          value={perPage}
          onChange={({ target }) => setPerPage(parseInt(target.value))}
          size="small"
          select
          sx={{ marginLeft: { md: "auto" }, marginTop: { xs: 2, md: 0 } }}
        >
          {[15, 30, 50, 100].map((value) => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </TextField>
      </Box>
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
                    <Link to={`/cryptocurrency/${coin.id}`} style={{ textDecoration: "none" }}>
                      <Typography>{coin.name}</Typography>
                    </Link>
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
                  <Chip
                    size="small"
                    color={coin.priceChangePercentage1h >= 0 ? "success" : "error"}
                    label={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        {coin.priceChangePercentage1h >= 0 ? (
                          <ArrowDropUp color="inherit" fontSize="large" />
                        ) : (
                          <ArrowDropDown color="inherit" fontSize="large" />
                        )}
                        {coin.priceChangePercentage1h}%
                      </Box>
                    }
                  />
                </TableCell>
                <TableCell>
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
                </TableCell>
                <TableCell>
                  <Chip
                    size="small"
                    color={coin.priceChangePercentage7d >= 0 ? "success" : "error"}
                    label={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        {coin.priceChangePercentage7d >= 0 ? (
                          <ArrowDropUp color="inherit" fontSize="large" />
                        ) : (
                          <ArrowDropDown color="inherit" fontSize="large" />
                        )}
                        {coin.priceChangePercentage7d}%
                      </Box>
                    }
                  />
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
                    <MiniChart
                      data={coin.priceIn7days}
                      isPositive={coin.priceChangePercentage7d >= 0}
                    />
                  </React.Suspense>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box display="flex" justifyContent="center" my={2}>
        <Pagination
          count={10}
          page={currentPage}
          onChange={(e: React.ChangeEvent<unknown>, val: number) => setPage(val)}
          color="primary"
        />
      </Box>
    </>
  );
};

export default Cryptocurrencies;
