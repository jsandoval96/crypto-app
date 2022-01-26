import {
  Box,
  Paper,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { getExchanges } from "@app/services/exchanges";
import { Exchange } from "@app/types/client";

const Exchanges = () => {
  const [exchanges, setExchanges] = useState<Exchange[]>([]);

  useEffect(() => {
    getExchanges(20).then((res) => setExchanges(res));
  }, []);

  return (
    <>
      <Box display="flex" mb={2} my={3} flexWrap="wrap">
        <Typography variant="h5" fontWeight="bold">
          Principales exchanges del mundo
        </Typography>
      </Box>
      <TableContainer component={Paper} sx={{ overflowY: "clip" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Año</TableCell>
              <TableCell>Pais</TableCell>
              <TableCell>Confiablilidad</TableCell>
              <TableCell>Volúmen en btc(24h)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {exchanges.map((ex) => (
              <TableRow key={ex.name}>
                <TableCell>{ex.trustRank}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <LazyLoadImage src={ex.img} alt={ex.name} height="25px" />
                    <Typography>{ex.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{ex.year ?? "-"}</TableCell>
                <TableCell>{ex.country ?? "-"}</TableCell>
                <TableCell>
                  <Box display="flex">
                    <Rating
                      name="exchange-rating"
                      defaultValue={Math.floor(ex.trustScore / 2)}
                      precision={1}
                      readOnly
                    />
                    <Typography mt={0.5}>{Math.floor(ex.trustScore / 2)}/5</Typography>
                  </Box>
                </TableCell>
                <TableCell>{ex.trading24hVolumeBtc.toLocaleString("es-Cl")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Exchanges;
