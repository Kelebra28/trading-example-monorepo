import { CurrencyData } from "./interface";

export type DailyTrendData = {
  date: Date;
  open: number;
  close: number;
  difference: number;
  volatility: number;
  };
  export type HistoricalData = {
    date: string;
    open: string;
    high: string;
    low: string;
    close: string;
  };

  export type ProcessedDailyTrend = {
    date: Date;
    difference: number;
    volatility: number;
  }

export type CurrencyPair = {
  id: string;
  label: string;
};

export type UseCurrencyDataReturn = {
  currencyData: CurrencyData | null;
  error: string | null;
  lastUpdated: Date | null;
};

export type UseCurrencyData = () => UseCurrencyDataReturn;