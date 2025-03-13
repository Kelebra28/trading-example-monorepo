import { getColorClass } from "../styles/colors";
import { colorMap } from "../constant/constant";

describe('getColorClass', () => {
  it('should return the correct color class for positive values', () => {
    expect(getColorClass(42)).toBe(colorMap.positive);
    expect(getColorClass(0.1)).toBe(colorMap.positive);
  });

  it('should return the correct color class for negative values', () => {
    expect(getColorClass(-42)).toBe(colorMap.negative);
    expect(getColorClass(-0.1)).toBe(colorMap.negative);
  });

  it('should return the correct color class for zero', () => {
    expect(getColorClass(0)).toBe(colorMap.zero);
    expect(getColorClass(-0)).toBe(colorMap.zero); 
  });

  it('should handle edge cases', () => {
    expect(getColorClass(NaN)).toBe(colorMap.zero);
  });
});