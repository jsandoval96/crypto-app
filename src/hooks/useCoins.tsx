import { useCallback, useEffect, useState } from "react";

import { getCoinsPaginated } from "@app/services/crypto";
import { Coin } from "@app/types/client";

export const useCoins = (limit = 0) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(limit);
  const [coins, setCoins] = useState<Coin[]>([]);

  const fetchCoins = useCallback(async () => {
    setLoading(true);
    const coins = await getCoinsPaginated(page, perPage);
    setCoins(coins);
    setLoading(false);
  }, [perPage, page]);

  useEffect(() => {
    limit && fetchCoins();
  }, [limit, fetchCoins]);

  return { coins, loading, currentPage: page, perPage, setPage, setPerPage };
};
