'use client'; 
import dynamic from 'next/dynamic';
import { PriceChartProps } from '../../../../libs/utils/src/types/';

const PriceChart = dynamic(
  () => import('../../../../libs/ui-components/src/').then((mod) => mod.PriceChart),
  { ssr: false }
);

export default function PriceChartWrapper({ data } : PriceChartProps ) {
  return <PriceChart data={data} />;
}