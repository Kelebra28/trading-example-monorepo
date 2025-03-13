import { colorKey } from '../styles/colors';

describe('colorKey', () => {
  it('should return "positive" for values greater than 0', () => {
    expect(colorKey(42)).toBe('positive');
    expect(colorKey(0.1)).toBe('positive');
    expect(colorKey(Infinity)).toBe('positive');
  });

  it('should return "negative" for values less than 0', () => {
    expect(colorKey(-42)).toBe('negative');
    expect(colorKey(-0.1)).toBe('negative');
    expect(colorKey(-Infinity)).toBe('negative');
  });

  it('should return "zero" for values equal to 0', () => {
    expect(colorKey(0)).toBe('zero');
    expect(colorKey(-0)).toBe('zero'); // -0 es técnicamente 0
  });

  it('should handle edge cases', () => {
    expect(colorKey(NaN)).toBe('zero'); // NaN podría manejarse como "zero" o lanzar un error, dependiendo de tu lógica
  });
});