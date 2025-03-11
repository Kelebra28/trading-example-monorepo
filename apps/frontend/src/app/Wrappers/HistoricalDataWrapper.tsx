// HistoricalDataWrapper.tsx
'use client'; // <-- Esto es crucial

import { useHistoricalData } from "@/hooks/useHistoricalData";
import { calculateDailyTrend, transformHistoricalData } from "../../../../../libs/utils/src";
import PriceChartWrapper from "../../DynamicCommponets/PriceChart";
import { DataGrid, historicalColumns, trendColumns} from "../../../../../libs/ui-components/src";

export const HistoricalDataWrapper = ({ symbol }: { symbol: string }) => {
  const { data: historicalData, loading, error } = useHistoricalData(symbol);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const dailyTrendData = calculateDailyTrend(historicalData);
  const transformedHistoricalData = transformHistoricalData(historicalData);

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Historical Prices</h2>
          <DataGrid data={historicalData} columns={historicalColumns} />
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold">Daily Trends</h2>
          <DataGrid data={dailyTrendData} columns={trendColumns} />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">Price Chart - {symbol}</h2>
        <PriceChartWrapper data={transformedHistoricalData} />
      </div>
    </>
  );
};