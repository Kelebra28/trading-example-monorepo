"use client";

import { Banner } from "../../../../libs/ui-components/src";
import { useCurrencyData } from "@/hooks/useCurrencyData";
import { Loading } from "../../../../libs/ui-components/src";

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
