"use client";

import { useHistoricalViewModel } from "@/hooks/useHistoricalViewModel";
import { HistoricalDataView } from "@/components/HistoricalDataView";

export const HistoricalDataWrapper = ({ symbol }: { symbol: string }) => {
  const {
    historicalData,
    dailyTrendData,
    transformedHistoricalData,
    loading,
    error,
  } = useHistoricalViewModel(symbol);

  return (
    <HistoricalDataView
      historicalData={historicalData || []}
      dailyTrendData={dailyTrendData}
      transformedHistoricalData={transformedHistoricalData}
      symbol={symbol}
      loading={loading}
      error={error}
    />
  );
};
