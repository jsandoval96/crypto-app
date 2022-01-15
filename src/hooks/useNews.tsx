import { useEffect, useState } from "react";

import { getNews } from "@app/services/news";
import { News } from "@app/types/client";

export const useNews = (limit = 0) => {
  const [news, setNews] = useState<News[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const news = await getNews({ search: "Criptomonedas", limit });
      setNews(news);
    };

    limit && fetchData();
  }, [limit]);

  return { news };
};
