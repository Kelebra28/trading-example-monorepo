"use client";

import { HistoricalDataWrapperProps } from "@monorepo/utils/types";
import { HistoricalDataView } from "@/components/HistoricalDataView";
import { useHistoricalViewModel } from "@/hooks/useHistoricalViewModel";

export const HistoricalDataWrapper = ({
  symbol,
}: HistoricalDataWrapperProps) => {
  const viewModel = useHistoricalViewModel(symbol);

  return <HistoricalDataView {...viewModel} symbol={symbol} />;
};
