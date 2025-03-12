"use client";

import { useEffect, useState } from "react";
import { fetchHistoricalData } from "../../../../libs/domain/src";
import { axiosClient } from "../../../../libs/domain/src";
import { HistoricalData } from "../../../../libs/utils/src";

export const useHistoricalData = (symbol: string) => {
  const [data, setData] = useState<HistoricalData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        if (!API_URL) throw new Error("API_URL no está definido");

        const response = await fetchHistoricalData(
          axiosClient,
          API_URL,
          symbol
        );
        setData(response);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [symbol]);

  return { data, loading, error };
};
