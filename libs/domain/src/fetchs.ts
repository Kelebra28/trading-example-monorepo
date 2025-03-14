import {  HistoricalData, CurrencyPair, HttpClient} from '@monorepo/utils';

export const fetchCurrencyPairs = async (
  httpClient: HttpClient,
  baseUrl: string
): Promise<CurrencyPair[]> => {
  if (!baseUrl || !baseUrl.startsWith('http')) {
    throw new Error('Invalid baseUrl');
  }

  try {
    const { data } = await httpClient.get<{ [key: string]: string }>(`${baseUrl}/pairs`);
    return Object.entries(data).map(([id, label]) => ({ id, label }));
  } catch (error) {
    console.error('Error fetching currency pairs:', error);
    throw error;
  }
};

export const fetchHistoricalData = async (
  httpClient: HttpClient,
  baseUrl: string,
  currencyId: string
): Promise<HistoricalData[]> => {
  try {
    if (!baseUrl || !baseUrl.startsWith('http')) {
      throw new Error(`URL base inválida: ${baseUrl}`);
    }

    const url = new URL(`/historic-data/${currencyId}`, baseUrl).toString();

    const { data } = await httpClient.get<{ 'Time Series FX': { [key: string]: Omit<HistoricalData, 'date'> } }>(url);

    if (!data['Time Series FX']) {
      return [];
    }

    return Object.entries(data['Time Series FX']).map(([date, values]) => ({
      date,
      ...values,
    }));
  } catch (error) {
    console.error(`Error fetching historical data for ${currencyId}:`, error);
    throw error;
  }
};