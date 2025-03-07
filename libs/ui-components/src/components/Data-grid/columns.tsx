'use client';

import { ColumnDef } from '@tanstack/react-table';

export type HistoricalData = {
  date: string;
  open: string;
  high: string;
  low: string;
  close: string;
};

export type DailyTrendData = {
  date: string | number | Date;
  difference: number;
  volatility: number;
};

export const historicalColumns: ColumnDef<HistoricalData>[] = [
  {
    header: 'Date',
    accessorKey: 'date',
    cell: (info) => new Date(info.getValue() as string).toLocaleDateString(),
  },
  { header: 'Open', accessorKey: 'open' },
  { header: 'Close', accessorKey: 'close' },
  { header: 'High', accessorKey: 'high' },
  { header: 'Low', accessorKey: 'low' },
];

export const trendColumns: ColumnDef<DailyTrendData>[] = [
  {
    header: 'Date',
    accessorKey: 'date',
    cell: (info) => new Date(info.getValue() as string | number | Date).toLocaleDateString(),
  },
  { header: 'Difference', accessorKey: 'difference' },
  { header: 'Volatility', accessorKey: 'volatility' },
];