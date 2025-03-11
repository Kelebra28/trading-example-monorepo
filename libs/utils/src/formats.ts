export const formatNumber = (value: number): string => {
    const truncated = Math.floor(value * 1000) / 1000;
    return truncated.toFixed(3);
  };
  
export  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    }).format(date).replace(/ /g, '-');
  };

  export const formatSymbol = (symbol: string): string => {
    if (symbol.length === 6) {
      return `${symbol.slice(0, 3)}-${symbol.slice(3)}`;
    }
    return symbol;
  };