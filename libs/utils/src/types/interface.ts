import { UseCurrencyData } from "./types";

import {
  HistoricalData,
  DailyTrendData,
  TransformedHistoricalData,
  SymbolPair,
} from "./financial-types";
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

export interface HistoricalDataViewProps {
  historicalData: HistoricalData[];
  dailyTrendData: DailyTrendData[];
  transformedHistoricalData: TransformedHistoricalData[];
  symbol: string;
  loading: boolean;
  error: string | null;
}
export interface SymbolTabsProps {
  useSymbolTabs: () => {
    currentSymbol: string;
    handleSelectSymbol: (symbol: string) => void;
    SymbolPairs: readonly SymbolPair[];
  };
}
export interface BannerViewModel {
  pair?: string;
  pointValue?: string;
  lastUpdatedTime?: string;
  error?: string | null;
  loading?: boolean;
}

export interface SymbolTabsViewModel {
  currentSymbol: string;
  symbolPairs: SymbolPair[];
  onSelectSymbol: (symbol: string) => void;
}
export interface HistoricalDataWrapperProps {
  symbol: string;
}

export interface PriceChartWrapperProps {
  data: TransformedHistoricalData[];
}
