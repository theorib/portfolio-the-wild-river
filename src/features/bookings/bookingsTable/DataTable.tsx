'use client'

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table'
import { useState } from 'react'
import { DEFAULT_BOOKING_ITEMS_PER_PAGE } from '@/shared/constants'
import { DataTablePagination } from '@/features/bookings/bookingsTable/DataTablePagination'

/** Here we are using any as the any way I found to be able to type the columns object when building it using createColumnHelper
 *  @see {@link https://github.com/TanStack/table/discussions/5218}
 *  @see {@link https://github.com/TanStack/table/discussions/5794}
 * otherwise we would normally use `columns: Array<ColumnHelper<TValue>>` while passing TValue to both the function and the
 * BookingsDataTableProps\<TData, TValue\>
 * BookingsDataTable\<TData, TValue\>
 * BookingsDataTable\<TData, TValue\>
 * BookingsDataTableProps\<TData, TValue\>
 **/
export interface DataTableProps<TData> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: Array<ColumnDef<TData, any>>
  data: { count: number; data: Array<TData> }
}

export default function DataTable<TData>({
  columns,
  data,
}: DataTableProps<TData>) {
  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: DEFAULT_BOOKING_ITEMS_PER_PAGE, //default page size
  })

  const table = useReactTable({
    columns,
    data: data.data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    onPaginationChange: setPagination,

    autoResetPageIndex: false,
    rowCount: data.count,
    state: {
      pagination,
    },
  })
  return (
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
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
  )
}
