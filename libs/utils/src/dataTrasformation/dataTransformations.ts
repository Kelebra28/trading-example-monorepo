import { HistoricalDataItem, TransformedHistoricalData } from "src/types";

export const transformHistoricalData = (
  historicalData: HistoricalDataItem[]
): TransformedHistoricalData[] => { 
  return historicalData.map((item) => ({
    timestamp: new Date(item.date).getTime(),
    high: parseFloat(item.high),
  }));
};