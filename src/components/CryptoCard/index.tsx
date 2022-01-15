import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { Box, Paper, Typography } from "@mui/material";

const CryptoCard = ({ name, value, rank, img, percent, children }: CryptoCardProps) => {
  return (
    <Paper sx={{ display: "flex", flexDirection: "column" }}>
      <Box display="flex" p={2}>
        <img src={img} alt={name} height="40px" />
        <Box px={1}>
          <Typography>
            {rank && `${rank}.`} {name}
          </Typography>
          <Typography fontWeight="bold">$ {value}</Typography>
        </Box>
        <Box marginLeft="auto" display="flex">
          {percent >= 0 ? (
            <ArrowDropUp color="success" fontSize="small" />
          ) : (
            <ArrowDropDown color="error" fontSize="small" />
          )}
          <Typography variant="body2" color={percent >= 0 ? "success.main" : "error.main"}>
            {percent}%
          </Typography>
        </Box>
      </Box>
      <Box px={2} pb={2}>
        {children}
      </Box>
    </Paper>
  );
};

interface CryptoCardProps {
  name: string;
  img: string;
  rank?: string | number;
  value: string | number;
  percent: number | string;
  children: JSX.Element;
}

export default CryptoCard;
