import { colorMap } from "../constant/constant";

export const colorKey = (value: number): "positive" | "negative" | "zero" => {
    if (value > 0) return "positive";
    if (value < 0) return "negative";
    return "zero";
  };
  
  export const getColorClass = (value: number): string => {
    const key = colorKey(value);
    return colorMap[key];
  };
  