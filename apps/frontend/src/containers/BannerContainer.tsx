"use client";

import { Banner } from "@monorepo/ui-components";
import { useCurrencyData } from "@/hooks/useCurrencyData";

export const BannerContainer = () => {
  const { currencyData, error, lastUpdated, loading } = useCurrencyData();

  const viewModel = {
    pair: currencyData?.pair,
    pointValue: currencyData?.point.toFixed(2),
    lastUpdatedTime: lastUpdated?.toLocaleTimeString(),
    error: error,
    loading
  };

  return <Banner viewModel={viewModel} />;
};
