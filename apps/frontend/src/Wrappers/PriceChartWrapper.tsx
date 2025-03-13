"use client";

import dynamic from "next/dynamic";
import { PriceChartWrapperProps } from "../../../../libs/utils/src";
import { Loading } from "../../../../libs/ui-components/src";

const PriceChart = dynamic(
  () =>
    import("../../../../libs/ui-components/src").then((mod) => mod.PriceChart),
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
