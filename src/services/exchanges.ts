import { Exchange } from "@app/types/api";

const BASE_URL = import.meta.env.VITE_API_COINGECKO_URL;
const API_HOST = import.meta.env.VITE_API_COINGECKO_HOST;
const API_KEY = import.meta.env.VITE_API_KEY;

export const getExchanges = async (limit: number) => {
  const res = await fetch(`${BASE_URL}/exchanges?per_page=${limit}`, {
    headers: {
      accept: "application/json",
      "x-rapidapi-host": API_HOST,
      "x-rapidapi-key": API_KEY,
    },
  });
  const data: Exchange[] = await res.json();

  return data.map((item) => {
    return {
      name: item.name,
      url: item.url,
      img: item.image,
      trustScore: item.trust_score,
      trustRank: item.trust_score_rank,
      country: item.country,
      year: item.year_established,
      trading24hVolumeBtc: item.trade_volume_24h_btc.toLocaleString(),
    };
  });
};
