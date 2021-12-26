import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, Container, Divider, Drawer, IconButton, Stack, Toolbar } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";

import Logo from "@app/layouts/Logo";
import MenuLinks from "@app/layouts/MenuLinks";

const Default = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

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
      <Outlet />
    </>
  );
};

export default Default;
