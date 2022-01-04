/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string;
  readonly VITE_API_KEY: string;
  readonly VITE_API_BING_NEWS_URL: string;
  readonly VITE_API_BING_NEWS_HOST: string;
  readonly VITE_API_COINGECKO_URL: string;
  readonly VITE_API_COINGECKO_HOST: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
