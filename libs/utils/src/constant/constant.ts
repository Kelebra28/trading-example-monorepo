export const SymbolPairs = [
    { display: 'AUD-USD', apiParam: 'AUDUSD' },
    { display: 'EUR-USD', apiParam: 'EURUSD' },
    { display: 'GBP-USD', apiParam: 'GBPUSD' },
    { display: 'USD-JPY', apiParam: 'USDJPY' },
    { display: 'USD-MXN', apiParam: 'USDMXN' },
  ] as const;

export const colorMap = {
    positive: "text-green-600",
    negative: "text-red-600",
    zero: "text-gray-600",
  };
