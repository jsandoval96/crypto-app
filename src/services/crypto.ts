import { CoinData, GlobalStats } from "@app/types";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getGlobalStats = async () => {
  const res = await fetch(`${BASE_URL}/global`, { headers: { accept: "application/json" } });
  const { data } = await res.json();
  const {
    active_cryptocurrencies,
    total_market_cap,
    total_volume,
    market_cap_change_percentage_24h_usd,
    markets,
    market_cap_percentage,
  }: GlobalStats = data;

  return {
    activeCryptocurrencies: active_cryptocurrencies,
    totalMarketCap: total_market_cap.usd,
    totalVolume24h: total_volume.usd,
    marketCapChangePercentage24h: market_cap_change_percentage_24h_usd.toFixed(2),
    marketDomainBtc: Math.trunc(market_cap_percentage.btc),
    exchanges: markets,
  };
};

export const getCoinsPaginated = async (page = 1, perPage = 50) => {
  const res = await fetch(
    `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d`,
    { headers: { accept: "application/json" } }
  );
  const data: CoinData[] = await res.json();

  return data.map((coin: CoinData) => {
    return {
      name: coin.name,
      symbol: coin.symbol,
      img: coin.image,
      price: coin.current_price,
      marketCap: coin.market_cap,
      volume: coin.total_volume,
      priceChangePercentage1h: coin.price_change_percentage_1h_in_currency,
      priceChangePercentage24h: coin.price_change_percentage_24h_in_currency,
      priceChangePercentage7d: coin.price_change_percentage_7d_in_currency,
      priceIn7days: coin.sparkline_in_7d.price,
    };
  });
};

export const getExchanges = async () => {
  return 9;
};
