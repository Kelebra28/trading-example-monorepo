import { CurrencyData } from "./interface";
import { SymbolPair } from "./financial-types";

export type ProcessedDailyTrend = {
  date: Date;
  difference: number;
  volatility: number;
};

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

export type UseSymbolTabsType = () => {
  currentSymbol: string;
  handleSelectSymbol: (symbol: string) => void;
  SymbolPairs: SymbolPair[];
};
