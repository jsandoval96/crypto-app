export interface GlobalStats {
  activeCryptocurrencies: number;
  totalMarketCap: number | string;
  totalVolume24h: number | string;
  marketCapChangePercentage24h: string | number;
  marketDomainBtc: number;
  exchanges: number;
}

export interface CoinSimple {
  name: string;
  symbol: string;
  img: string;
  price: number;
  priceChangePercentage7d: number | string;
  priceIn7days: number[];
}

export interface Coin extends CoinSimple {
  rank: number;
  marketCap: number | string;
  volume: number | string;
  priceChangePercentage1h: number | string;
  priceChangePercentage24h: number | string;
}

export interface News {
  title: string;
  url: string;
  description: string;
  img: string;
  date: string;
  provider: {
    name: string;
    img: string;
  };
}

export interface Exchange {
  name: string;
  url: string;
  img: string;
  trustScore: number;
  trustRank: number;
  trading24hVolumeBtc: number;
}
