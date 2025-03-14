import { HistoricalData, DailyTrendData } from '../';
import { calculateDailyTrend } from '../';


describe('calculateDailyTrend', () => {
  it('should calculate daily trend correctly', () => {
    const input: HistoricalData[] = [
      { date: '2023-10-01', open: '100.00', close: '101.00', high: '102.00', low: '99.00' },
      { date: '2023-10-02', open: '101.00', close: '102.00', high: '103.00', low: '100.00' },
    ];

    const expectedOutput: DailyTrendData[] = [
      {
        date: new Date('2023-10-01'),
        open: 100.00,
        close: 101.00,
        difference: 1.00,
        volatility: 3.00,
      },
      {
        date: new Date('2023-10-02'),
        open: 101.00,
        close: 102.00,
        difference: 1.00,
        volatility: 3.00,
      },
    ];

    expect(calculateDailyTrend(input)).toEqual(expectedOutput);
  });

  it('should handle empty input', () => {
    const input: HistoricalData[] = [];
    expect(calculateDailyTrend(input)).toEqual([]);
  });

  it('should handle invalid date format', () => {
    const input: HistoricalData[] = [
      { date: 'invalid-date', open: '100.00', close: '101.00', high: '102.00', low: '99.00' },
    ];

    expect(calculateDailyTrend(input)[0].date.toString()).toBe('Invalid Date');
  });

  it('should handle invalid numeric values', () => {
    const input: HistoricalData[] = [
      { date: '2023-10-01', open: 'invalid-open', close: 'invalid-close', high: 'invalid-high', low: 'invalid-low' },
    ];

    const result = calculateDailyTrend(input)[0];
    expect(result.open).toBeNaN();
    expect(result.close).toBeNaN();
    expect(result.difference).toBeNaN();
    expect(result.volatility).toBeNaN();
  });
});