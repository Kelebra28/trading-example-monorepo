"use client";

import { Banner } from "../../../../libs/ui-components/src";
import { useCurrencyData } from "@/hooks/useCurrencyData";

export const BannerContainer = () => {
  const { currencyData, error, lastUpdated } = useCurrencyData();

  const viewModel = {
    pair: currencyData?.pair,
    pointValue: currencyData?.point.toFixed(2),
    lastUpdatedTime: lastUpdated?.toLocaleTimeString(),
    error: error,
  };

  return <Banner viewModel={viewModel} />;
};
