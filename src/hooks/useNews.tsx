import { useEffect, useState } from "react";

import { getNews } from "@app/services/news";
import { News } from "@app/types/client";

export const useNews = (limit = 0) => {
  const [news, setNews] = useState<News[]>([]);
  const [searchText, setSearchText] = useState<string>("Criptomonedas");

  useEffect(() => {
    const fetchData = async () => {
      const news = await getNews({ search: searchText, limit });
      setNews(news);
    };

    limit && fetchData();
  }, [limit, searchText]);

  const findNews = (search: string) => {
    setSearchText(!search ? "Criptomonedas" : search);
  };

  return { news, findNews, searchText };
};
