import React from 'react';
interface PriceChartProps {
    data: Array<{
        timestamp: number;
        close: number;
    }>;
}
export declare const PriceChart: ({ data }: PriceChartProps) => React.JSX.Element;
export {};
