'use client'

import { flexRender } from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table'
import { DataTablePagination } from '@/features/dataTable/components/DataTablePagination'
import useDataTable, {
  type DataTableProps,
} from '@/features/dataTable/hooks/useDataTable'
import { DataTableViewOptions } from '@/features/dataTable/components/DataTableViewOptions'

export default function DataTable<TData>({
  columns,
  data,
  rowCount,
  defaultColumnVisibility,
  defaultSorting,
  defaultColumnFilters,
}: DataTableProps<TData>) {
  const { table } = useDataTable({
    columns,
    data,
    rowCount,
    defaultColumnVisibility,
    defaultSorting,
    defaultColumnFilters,
  })

  return (
    <div>
      <div className="flex items-center justify-end py-4">
        <DataTableViewOptions table={table} />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex justify-between p-4">
          <DataTablePagination table={table} />
        </div>
      </div>
    </div>
  )
}
