// dataTransformation.ts
import { HistoricalData, TransformedHistoricalData } from "../types";

export const transformHistoricalData = (
  historicalData: HistoricalData[]
): TransformedHistoricalData[] => { 
  return historicalData.map((item) => ({
    timestamp: new Date(item.date).getTime(),
    high: parseFloat(item.high),
  }));
};