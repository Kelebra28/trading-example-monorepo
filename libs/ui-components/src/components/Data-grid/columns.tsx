"use-client"
import { ColumnDef } from "@tanstack/react-table";
import { 
  HistoricalData, 
  DailyTrendData,
  formatDate,
  formatNumber,
  getColorClass 
} from "../../../../utils/src";

export const historicalColumns: ColumnDef<HistoricalData>[] = [
  {
    header: "Date",
    accessorKey: "date",
    cell: (info) => formatDate(new Date(info.getValue<string>())),
  },
  {
    header: "High",
    accessorKey: "high",
    cell: (info) => formatNumber(info.getValue<number>()),
  },
  {
    header: "Low",
    accessorKey: "low",
    cell: (info) => formatNumber(info.getValue<number>()),
  },
];

export const trendColumns: ColumnDef<DailyTrendData>[] = [
  {
    header: "Date",
    accessorKey: "date",
    cell: (info) => formatDate(new Date(info.getValue<string>())),
  },
  {
    header: "Open",
    accessorKey: "open",
    cell: (info) => formatNumber(info.getValue<number>()),
  },
  {
    header: "Close",
    accessorKey: "close",
    cell: (info) => formatNumber(info.getValue<number>()),
  },
  {
    header: "Diference",
    accessorKey: "difference",
    cell: (info) => {
      const value = info.getValue<number>();
      const colorClass = getColorClass(value);
      return (
        <span className={`${colorClass} font-medium`}>
          {formatNumber(value)}
        </span>
      );
    },
  },
];