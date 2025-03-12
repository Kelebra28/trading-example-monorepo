"use client";

import { useHistoricalData } from "@/hooks/useHistoricalData";
import {
  calculateDailyTrend,
  transformHistoricalData,
} from "../../../../libs/utils/src";

export const useHistoricalViewModel = (symbol: string) => {
  const { data: historicalData, loading, error } = useHistoricalData(symbol);

  const dailyTrendData = calculateDailyTrend(historicalData || []);
  const transformedHistoricalData = transformHistoricalData(
    historicalData || []
  );

  return {
    historicalData,
    dailyTrendData,
    transformedHistoricalData,
    loading,
    error,
  };
};
