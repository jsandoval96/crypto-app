import { CoinData, GlobalStats } from "@app/types";

const BASE_URL = import.meta.env.VITE_API_COINGECKO_URL;
const API_HOST = import.meta.env.VITE_API_COINGECKO_HOST;
const API_KEY = import.meta.env.VITE_API_KEY;

export const getGlobalStats = async () => {
  const res = await fetch(`${BASE_URL}/global`, {
    headers: {
      accept: "application/json",
      "x-rapidapi-host": API_HOST,
      "x-rapidapi-key": API_KEY,
    },
  });
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
    totalMarketCap: total_market_cap.usd.toLocaleString(),
    totalVolume24h: total_volume.usd.toLocaleString(),
    marketCapChangePercentage24h: market_cap_change_percentage_24h_usd.toFixed(2),
    marketDomainBtc: Math.trunc(market_cap_percentage.btc),
    exchanges: markets,
  };
};

export const getCoinsPaginated = async (page = 1, perPage = 50) => {
  const res = await fetch(
    `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d`,
    {
      headers: {
        accept: "application/json",
        "x-rapidapi-host": API_HOST,
        "x-rapidapi-key": API_KEY,
      },
    }
  );
  const data: CoinData[] = await res.json();

  return data.map((coin: CoinData) => {
    return {
      rank: coin.market_cap_rank,
      name: coin.name,
      symbol: coin.symbol,
      img: coin.image,
      price: coin.current_price,
      marketCap: coin.market_cap.toLocaleString("en-US"),
      volume: coin.total_volume.toLocaleString("en-US"),
      priceChangePercentage1h: coin.price_change_percentage_1h_in_currency.toFixed(2),
      priceChangePercentage24h: coin.price_change_percentage_24h_in_currency.toFixed(2),
      priceChangePercentage7d: coin.price_change_percentage_7d_in_currency.toFixed(2),
      priceIn7days: coin.sparkline_in_7d.price,
    };
  });
};

export const getCoinsTrending = async () => {
  const res = await fetch(`https://api.coingecko.com/api/v3/search/trending?sparkline=true`, {
    headers: { accept: "application/json" },
  });
  const { coins } = await res.json();
  const trendingCoins = coins.map(({ item }: any) => item.id).join(",");

  const res2 = await fetch(
    `${BASE_URL}/coins/markets?vs_currency=usd&ids=${trendingCoins}&order=market_cap_desc&sparkline=true&price_change_percentage=7d`,
    {
      headers: {
        accept: "application/json",
        "x-rapidapi-host": API_HOST,
        "x-rapidapi-key": API_KEY,
      },
    }
  );
  const data: CoinData[] = await res2.json();

  return data.map((coin: CoinData) => {
    return {
      name: coin.name,
      symbol: coin.symbol,
      img: coin.image,
      price: coin.current_price,
      priceIn7days: coin.sparkline_in_7d.price,
      priceChangePercentage7d: coin.price_change_percentage_7d_in_currency.toFixed(2),
    };
  });
};

export const getCoinInfo = async (coinId: string) => {
  const res = await fetch(
    `${BASE_URL}/coins/${coinId}?tickers=false&community_data=false&developer_data=false&sparkline=true`,
    { headers: { accept: "application/json" } }
  );
};

export const getExchanges = async () => {
  return 9;
};
