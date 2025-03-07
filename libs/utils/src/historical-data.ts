import axios from 'axios';

export type HistoricalData = {
  date: string;
  open: string;
  high: string;
  low: string;
  close: string;
};

export type CurrencyPair = {
  id: string;
  label: string;
};

export const fetchCurrencyPairs = async (): Promise<CurrencyPair[]> => {
  try {
    const { data } = await axios.get('https://fe-challenge.cicadatech.net/pairs');
    
    // Transformar el objeto en un array de objetos con id y label
    return Object.entries(data).map(([id, label]) => ({ id, label: label as string }));
  } catch (error) {
    console.error('Error fetching currency pairs:', error);
    throw error;
  }
};

export const fetchHistoricalData = async (currencyId: string): Promise<HistoricalData[]> => {
  try {
    const { data } = await axios.get(`https://fe-challenge.cicadatech.net/historic-data/${currencyId}`);
    return data['Time Series FX'];
  } catch (error) {
    console.error(`Error fetching historical data for ${currencyId}:`, error);
    throw error;
  }
};

export const calculateDailyTrend = (data: HistoricalData[]) => {
  return data.map(item => ({
    date: new Date(item.date),
    difference: parseFloat(item.close) - parseFloat(item.open),
    volatility: parseFloat(item.high) - parseFloat(item.low),
  }));
};

// Función para obtener y calcular datos históricos de TODOS los pares
export const getAllHistoricalTrends = async () => {
  try {
    const pairs = await fetchCurrencyPairs();
    const results = await Promise.all(
      pairs.map(async (pair) => {
        const historicalData = await fetchHistoricalData(pair.id);
        return {
          pair: pair.label,
          trends: calculateDailyTrend(historicalData),
        };
      })
    );
    return results;
  } catch (error) {
    console.error('Error getting all historical trends:', error);
    throw error;
  }
};

getAllHistoricalTrends()
  .then(results => {
    console.log('Results:', results);
  })
  .catch(error => {
    console.error('Error:', error);
  });