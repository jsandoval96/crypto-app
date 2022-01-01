import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import { LINKS } from "@app/constants/routes";

const MenuLinks = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <>
      {LINKS.map(({ name, href }, idx) => (
        <Button
          key={idx}
          sx={{
            color: pathname !== href ? "rgba(0, 0, 0, 0.8)" : "primary.main",
            textTransform: "none",
            fontWeight: "bold",
          }}
          onClick={() => navigate(href)}
        >
          {name}
        </Button>
      ))}
      <Button
        variant="outlined"
        color="primary"
        startIcon={<PersonOutlinedIcon />}
        sx={{ textTransform: "none", fontWeight: "bold" }}
      >
        Ingresar
      </Button>
    </>
  );
};

export default MenuLinks;
