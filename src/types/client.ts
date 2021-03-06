export interface GlobalStats {
  activeCryptocurrencies: number;
  totalMarketCap: number | string;
  totalVolume24h: number | string;
  marketCapChangePercentage24h: string | number;
  marketDomainBtc: number;
  exchanges: number;
}

export interface CoinSimple {
  id: string;
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
  year: number;
  country: string;
  trustScore: number;
  trustRank: number;
  trading24hVolumeBtc: number | string;
}

export interface Crypto {
  name: string;
  symbol: string;
  rank: number;
  description: string;
  img: string;
  circulatingQuantity: number;
  currentPrice: number;
  marketCap: number;
  totalSupply: number;
  totalFullyDilutedValuation: number;
  priceChangePercentage24h: number;
  totalVolume24h: number;
  spakline7d: number[];
  links: {
    homepage: string;
    community: {
      forum: string;
      reddit: string;
      twitter: string;
      github: string;
    };
  };
}
