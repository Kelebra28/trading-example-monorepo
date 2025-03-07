export interface CurrencyData {
  currency: string;
  point: number;
  pair: string;
}

export type DailyTrendData = {
    date: string | number | Date;
    difference: number;
    volatility: number;
  };