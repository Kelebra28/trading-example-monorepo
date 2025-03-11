import { UseCurrencyData } from "./types";

export interface PriceChartProps {
    data: Array<{
      timestamp: number;
      high: number;
    }>;
  }
  export interface CurrencyData {
    currency: string;
    point: number;
    pair: string;
  }
  export interface HttpClient {
    get<T>(url: string): Promise<{ data: T }>;
  }

 export interface BannerProps {
    useCurrencyData: UseCurrencyData;
  }

  export interface HistoricalDataItem {
    date: string; 
    high: string; 
  }
  