'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import React from 'react';

interface DataGridProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
}

export const DataGrid = <T,>({ data, columns }: DataGridProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="rounded-md border overflow-x-auto">
      <table className="w-full">
        <thead className="bg-muted">
          {table.getHeaderGroups().map((headerGroup: { id: React.Key | null | undefined; headers: any[]; }) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="px-4 py-3 text-left text-sm font-medium"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y">
          {table.getRowModel().rows.map((row: { id: React.Key | null | undefined; getVisibleCells: () => any[]; }) => (
            <tr key={row.id} className="hover:bg-muted/50">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="px-4 py-3 text-sm">
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};