import { Box, Paper, Typography } from "@mui/material";
import CountUp from "react-countup";

const Card = ({
  name,
  value,
  valueType = "currency",
  icon,
  showFormatted = false,
  children,
}: CardProps) => {
  const formatNumber = (type: FormattingType, val: number) => {
    return type === "currency"
      ? new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(val)
      : `${val} %`;
  };

  return (
    <Paper elevation={1} sx={{ display: "flex", py: 1, px: 2 }}>
      <Box display="flex" alignItems="center" mr={2} fontSize={50} color="primary.dark">
        {icon}
      </Box>
      <Box display="flex" flexDirection="column">
        <Typography variant="h6" display={{ xs: "block", sm: "flex" }}>
          {value && (
            <CountUp
              end={value}
              duration={1}
              formattingFn={(n) => (showFormatted ? formatNumber(valueType, n) : n.toString())}
            />
          )}
          {children}
        </Typography>
        <Typography variant="subtitle1">{name}</Typography>
      </Box>
    </Paper>
  );
};

type FormattingType = "number" | "percent" | "currency";

interface CardProps {
  name: string;
  value: number | undefined;
  valueType?: FormattingType;
  showFormatted?: boolean;
  icon?: JSX.Element;
  children?: JSX.Element;
}

export default Card;
