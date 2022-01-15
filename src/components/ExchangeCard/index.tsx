import { Box, Paper, Typography } from "@mui/material";

const ExchangeCard = ({ name, img, rank, trustScore, volume24h }: ExchangeCardProps) => {
  return (
    <Paper sx={{ display: "flex", flexDirection: "column" }}>
      <Box display="flex" p={2}>
        <img src={img} alt={name} height="40px" />
        <Box px={1}>
          <Typography>
            {rank && `${rank}.`} {name}
          </Typography>
          <Typography variant="caption">Volumen(24h) in Btc</Typography>
          <Typography variant="body2" fontWeight="bold">
            {volume24h}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

interface ExchangeCardProps {
  name: string;
  img: string;
  rank: number;
  trustScore: number;
  volume24h: number;
}

export default ExchangeCard;
