"use-client"
import { ColumnDef } from "@tanstack/react-table";
import { 
  HistoricalData, 
  DailyTrendData,
  formatDate,
  formatNumber,
  getColorClass 
} from "@monorepo/utils";

export const historicalColumns = [
  {
    header: "Date",
    accessorKey: "date" as const,
    cell: (info) => formatDate(new Date(info.getValue<string>())),
  },
  {
    header: "High",
    accessorKey: "high" as const,
    cell: (info) => formatNumber(parseFloat(info.getValue<string>())),
  },
  {
    header: "Low",
    accessorKey: "low" as const,
    cell: (info) => formatNumber(parseFloat(info.getValue<string>())),
  },
] satisfies ColumnDef<HistoricalData, keyof HistoricalData>[];;

export const trendColumns = [
  {
    header: "Date",
    accessorKey: "date" as const,
    cell: (info) => formatDate(info.getValue<Date>()),
  },
  {
    header: "Open",
    accessorKey: "open" as const,
    cell: (info) => formatNumber(parseFloat(info.getValue<string>())),
  },
  {
    header: "Close",
    accessorKey: "close" as const,
    cell: (info) => formatNumber(parseFloat(info.getValue<string>())),
  },
  {
    header: "Diference",
    accessorKey: "difference" as const,
    cell: (info) => {
      const value = info.getValue<number>();
      const colorClass = getColorClass(value);
      return (
        <span className={`${colorClass} font-medium`}>
          {formatNumber(parseFloat(info.getValue<string>()))}
        </span>
      );
    },
  },
]  satisfies ColumnDef<DailyTrendData, keyof DailyTrendData>[];;