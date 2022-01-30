import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Container,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import Logo from "@app/layouts/Logo";
import MenuLinks from "@app/layouts/MenuLinks";
import { getGlobalStats } from "@app/services/crypto";
import { GlobalStats } from "@app/types/client";

const Default = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [globalStats, setGlobalStats] = useState<GlobalStats>();
  const capMarketWentUp = globalStats?.marketCapChangePercentage24h ?? 0 >= 0;

  useEffect(() => {
    const fetchData = async () => {
      const stats = await getGlobalStats();
      setGlobalStats(stats);
    };

    fetchData();
  }, []);

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ bgcolor: "white", color: "rgba(0, 0, 0, 0.8)" }}>
          <Container sx={{ display: "flex" }}>
            <Box display="flex" marginRight="auto">
              <Logo />
            </Box>
            <Stack direction="row" spacing={2} display={{ xs: "none", md: "flex" }}>
              <MenuLinks />
            </Stack>
            <IconButton
              sx={{ display: { md: "none" } }}
              onClick={() => setOpenSidebar(!openSidebar)}
            >
              <MenuIcon />
            </IconButton>
          </Container>
        </Toolbar>
      </AppBar>
      <Drawer
        open={openSidebar}
        onClose={() => setOpenSidebar(false)}
        ModalProps={{ keepMounted: true }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
          <Logo />
        </Toolbar>
        <Divider />
        <Box width={250} display="flex" flexDirection="column" gap={1} pt={2}>
          <MenuLinks />
        </Box>
      </Drawer>
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
      <Box component="main" sx={{ px: { xs: 1.5, sm: 3, md: 6, lg: 12 } }} pb={1.5}>
        <Outlet />
      </Box>
    </>
  );
};

export default Default;
