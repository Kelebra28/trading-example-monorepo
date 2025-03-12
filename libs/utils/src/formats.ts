export const formatNumber = (value: number): string => {
    const truncated = Math.floor(value * 1000) / 1000;
    return truncated.toFixed(3);
  };
  
  export const formatDate = (date: Date): string => {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return 'Invalid Date';
    }
  
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      timeZone: 'UTC',
    })
      .format(date)
      .replace(/,?\s+/g, '-') 
      .replace(/-$/, '');
  };
  

  export const formatSymbol = (symbol: string): string => {
    if (symbol.length === 6) {
      return `${symbol.slice(0, 3)}-${symbol.slice(3)}`;
    }
    return symbol;
  };