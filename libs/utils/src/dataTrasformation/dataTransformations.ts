import { HistoricalDataItem } from "src/types";

export const transformHistoricalData = (historicalData: HistoricalDataItem[]) => {
  return historicalData.map((item) => ({
    timestamp: new Date(item.date).getTime(),
    high: parseFloat(item.high),
  }));
};