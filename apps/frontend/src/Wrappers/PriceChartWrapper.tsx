"use client";

import dynamic from "next/dynamic";
import { PriceChartWrapperProps } from "@monorepo/utils/types";
import { Loading } from "@monorepo/ui-components";

const PriceChart = dynamic(
  () =>
    import("@monorepo/ui-components").then((mod) => mod.PriceChart),
  {
    ssr: false,
    loading: () => (
      <div className="space-y-2">
        <Loading variant="dots" size="md" message="Loading..." />
      </div>
    ),
  }
);

export const PriceChartWrapper = ({ data }: PriceChartWrapperProps) => {
  return <PriceChart data={data} />;
};
