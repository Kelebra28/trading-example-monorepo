// import axios from 'axios';
import { HistoricalData, DailyTrendData } from '../types/types';
import { fetchCurrencyPairs , fetchHistoricalData , axiosClient  } from '../../../domain/dist';

export const calculateDailyTrend = (data: HistoricalData[]): DailyTrendData[] => {
  return data.map(item => ({
    date: new Date(item.date),
    open: parseFloat(item.open),
    close: parseFloat(item.close),
    difference: parseFloat(item.close) - parseFloat(item.open),
    volatility: parseFloat(item.high) - parseFloat(item.low)
  }));
};
