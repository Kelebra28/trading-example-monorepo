"use client";

import {
  DataGrid,
  trendColumns,
  historicalColumns,
  SkeletonLoader,
} from "@monorepo/ui-components";
import { PriceChartWrapper } from "@/Wrappers";
import {
  HistoricalData,
  DailyTrendData,
  HistoricalDataViewProps,
} from "@monorepo/utils/types";

export const HistoricalDataView = ({
  historicalData,
  dailyTrendData,
  transformedHistoricalData,
  symbol,
  loading,
  error,
}: HistoricalDataViewProps) => {
  if (loading)
    return (
      <div className="space-y-2">
        <SkeletonLoader className="h-8 w-full" count={5} />
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Historical Prices</h2>
          <DataGrid<HistoricalData>
            data={historicalData}
            columns={historicalColumns}
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold">Daily Trends</h2>
          <DataGrid<DailyTrendData>
            data={dailyTrendData}
            columns={trendColumns}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">Price Chart : {symbol}</h2>
        <PriceChartWrapper data={transformedHistoricalData} />
      </div>
    </>
  );
};
