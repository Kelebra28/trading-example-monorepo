export type HistoricalData = {
    date: string;
    open: string;
    high: string;
    low: string;
    close: string;
  };
  
  export type DailyTrendData = {
    date: Date;
    open: number;
    close: number;
    difference: number;
    volatility: number;
  };
  
  export type TransformedHistoricalData = {
    timestamp: number;
    high: number;
  };
  
  export type SymbolPair = { display: string, apiParam: string };