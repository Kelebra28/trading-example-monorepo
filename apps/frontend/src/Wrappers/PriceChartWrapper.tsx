'use client';

import dynamic from 'next/dynamic';
import { PriceChart } from '../../../../libs/ui-components/src';
import { TransformedHistoricalData } from '../../../../libs/utils/src';

interface PriceChartWrapperProps {
  data: TransformedHistoricalData[];
}

export const PriceChartWrapper = ({ data }: PriceChartWrapperProps) => {
  return <PriceChart data={data} />;
};