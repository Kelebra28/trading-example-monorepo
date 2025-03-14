import { formatNumber, formatDate, formatSymbol } from '../formats';

describe('formatNumber', () => {
  it('should format numbers with decimal precision', () => {
    expect(formatNumber(123.45678)).toBe('123.456');
    expect(formatNumber(0.9999)).toBe('0.999');
    
    expect(formatNumber(42)).toBe('42.000');
    expect(formatNumber(100.2)).toBe('100.200');
    
    expect(formatNumber(0)).toBe('0.000');
    expect(formatNumber(NaN)).toBe('NaN');
  });
});

describe('formatDate', () => {
  it('should format dates in short format with dashes', () => {
    const testDate1 = new Date(Date.UTC(2023, 0, 15)); 
    expect(formatDate(testDate1)).toBe('Jan-15-2023');

    const testDate2 = new Date(Date.UTC(2024, 11, 31));
    expect(formatDate(testDate2)).toBe('Dec-31-2024');
  });

  it('should handle invalid dates', () => {
    expect(formatDate(new Date('invalid'))).toBe('Invalid Date');
    expect(formatDate(null as any)).toBe('Invalid Date');
    expect(formatDate(undefined as any)).toBe('Invalid Date');
  });
});

describe('formatSymbol', () => {
  it('should split 6-character symbols with a dash', () => {
    expect(formatSymbol('BTCUSD')).toBe('BTC-USD');
    expect(formatSymbol('ETHARS')).toBe('ETH-ARS');
  });

  it('should leave other lengths unchanged', () => {
    expect(formatSymbol('BTCUSDT')).toBe('BTCUSDT');   
    expect(formatSymbol('XRP')).toBe('XRP');       
    expect(formatSymbol('')).toBe('');                 
  });

  it('should handle mixed case symbols', () => {
    expect(formatSymbol('btcusd')).toBe('btc-usd');
    expect(formatSymbol('EthBtc')).toBe('Eth-Btc');
  });
});