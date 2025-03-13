"use client";

import { HistoricalDataWrapperProps } from "../../../../libs/utils/src";
import { HistoricalDataView } from "@/components/HistoricalDataView";
import { useHistoricalViewModel } from "@/hooks/useHistoricalViewModel";

export const HistoricalDataWrapper = ({
  symbol,
}: HistoricalDataWrapperProps) => {
  const viewModel = useHistoricalViewModel(symbol);

  return <HistoricalDataView {...viewModel} symbol={symbol} />;
};
