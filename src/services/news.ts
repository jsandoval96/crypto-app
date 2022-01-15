import { News } from "@app/types/api";

const BASE_URL = import.meta.env.VITE_API_BING_NEWS_URL;
const API_HOST = import.meta.env.VITE_API_BING_NEWS_HOST;
const API_KEY = import.meta.env.VITE_API_KEY;

export const getNews = async ({
  search,
  limit,
  lang = "en-US",
}: {
  search: string;
  limit: number;
  lang?: string;
}) => {
  const res = await fetch(
    `${BASE_URL}/news/search?q=${search}&count=${limit}&freshness=Month&textFormat=Raw`,
    {
      headers: {
        accept: "application/json",
        "x-bingapis-sdk": "true",
        "x-rapidapi-host": API_HOST,
        "x-rapidapi-key": API_KEY,
      },
    }
  );

  const { value } = await res.json();

  return value.map((item: News) => {
    return {
      title: item.name,
      url: item.url,
      description: item.description,
      img: item.image?.thumbnail?.contentUrl || "",
      date: item.datePublished,
      provider: {
        name: item.provider[0].name,
        img: item.provider[0].image?.thumbnail?.contentUrl || "",
      },
    };
  });
};
