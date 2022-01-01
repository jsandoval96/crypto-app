import {
  AccountBalanceWalletOutlined,
  ArrowDropDown,
  ArrowDropUp,
  EqualizerOutlined,
  MonetizationOnOutlined,
  StoreOutlined,
} from "@mui/icons-material";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import Card from "@app/components/Card";
import BtcIcon from "@app/components/Icons/BtcIcon";
import { getCoinsPaginated, getGlobalStats } from "@app/services/crypto";

const Home = () => {
  const [globalStats, setGlobalStats] = useState<GlobalStats>();
  const [coins, setCoins] = useState<Coin[]>([]);
  const capMarketWentUp = globalStats?.marketCapChangePercentage24h ?? 0 >= 0;

  useEffect(() => {
    const fetchData = async () => {
      const [stats, coins] = await Promise.all([getGlobalStats(), getCoinsPaginated()]);

      setGlobalStats(stats);
      setCoins(coins);
    };

    fetchData();
  }, []);

  return (
    <Container sx={{ pt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} lg={4}>
          <Card
            name="Monedas"
            value={globalStats?.activeCryptocurrencies}
            icon={<MonetizationOnOutlined fontSize="inherit" />}
          />
        </Grid>
        <Grid item xs={12} sm={true} lg={4}>
          <Card
            name="Cap. de mercado"
            value={globalStats?.totalMarketCap}
            icon={<AccountBalanceWalletOutlined fontSize="inherit" />}
            showFormatted
          >
            <Box display="flex" alignItems="center" maxHeight={32}>
              {capMarketWentUp ? (
                <ArrowDropUp color="success" fontSize="large" />
              ) : (
                <ArrowDropDown color="error" fontSize="large" />
              )}
              <Typography color={capMarketWentUp ? "success.main" : "error.main"}>
                {globalStats?.marketCapChangePercentage24h}%
              </Typography>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Card
            name="Vol. de mercado en 24h"
            value={globalStats?.totalVolume24h}
            icon={<EqualizerOutlined fontSize="inherit" />}
            showFormatted
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Card
            name="Intercambios"
            value={globalStats?.exchanges}
            icon={<StoreOutlined fontSize="inherit" />}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Card
            name="Dominio del bitcoin"
            value={globalStats?.marketDomainBtc}
            valueType="percent"
            icon={<BtcIcon fontSize="inherit" />}
            showFormatted
          />
        </Grid>
      </Grid>
    </Container>
  );
};

interface GlobalStats {
  activeCryptocurrencies: number;
  totalMarketCap: number;
  totalVolume24h: number;
  marketCapChangePercentage24h: string;
  marketDomainBtc: number;
  exchanges: number;
}

interface Coin {
  name: string;
  symbol: string;
  img: string;
  price: number;
  marketCap: number;
  volume: number;
  priceChangePercentage1h: number | null;
  priceChangePercentage24h: number | null;
  priceChangePercentage7d: number;
  priceIn7days: number[];
}

export default Home;
