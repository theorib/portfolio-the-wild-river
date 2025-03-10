import { DEFAULT_BOOKING_ITEMS_PER_PAGE } from '@/shared/constants'
import {
  type ColumnDef,
  type ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from '@tanstack/react-table'
import { useState } from 'react'

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
  data: Array<TData>
  rowCount: number
  defaultSorting?: SortingState
  defaultColumnFilters?: ColumnFiltersState
  defaultColumnVisibility?: VisibilityState
}

export default function useDataTable<TData>({
  columns,
  data,
  rowCount,
  defaultSorting,
  defaultColumnFilters,
  defaultColumnVisibility,
}: DataTableProps<TData>) {
  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: DEFAULT_BOOKING_ITEMS_PER_PAGE, //default page size
  })
  const [sorting, setSorting] = useState<SortingState>(defaultSorting || [])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    defaultColumnFilters || [],
  )
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    defaultColumnVisibility || {},
  )

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    autoResetPageIndex: false,
    rowCount,
    state: {
      pagination,
      sorting,
      columnFilters,
      columnVisibility,
    },
  })
  return { table }
}
