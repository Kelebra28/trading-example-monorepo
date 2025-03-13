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

export const variantClasses = {
  spinner: 'animate-spin rounded-full border-4 border-t-transparent',
  dots: 'flex space-x-2',
  skeleton: 'animate-pulse bg-gradient-to-r from-gray-200 to-gray-300 rounded-md'
};

export const sizeClasses = {
  sm: "h-6 w-6",
  md: "h-8 w-8",
  lg: "h-12 w-12",
};