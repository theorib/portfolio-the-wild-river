'use client'

import { bookingsTableColumns } from '@/features/bookings/bookingsTable/BookingsTableColumns'
import BookingsTable from '@/features/bookings/bookingsTable/BookingsTable'
import useBookings from '@/features/bookings/hooks/useBookings'

import { useSearchParams } from 'next-typesafe-url/app'
import { Route } from '@/app/app/bookings/routeType'
import { DEFAULT_BOOKING_ITEMS_PER_PAGE } from '@/shared/constants'
import { BookingsTablePagination } from '@/features/bookings/bookingsTable/BookingsTablePagination'
import { BookingsTableItemsPerPage } from '@/features/bookings/bookingsTable/BookingsTableItemsPerPage'

export const bookingsTableDefaultPagination = {
  columnName: 'id',
  range: {
    startIndex: 0,
    endIndex: DEFAULT_BOOKING_ITEMS_PER_PAGE - 1,
  },
  numberOfItems: DEFAULT_BOOKING_ITEMS_PER_PAGE,
} as const

export const bookingsTableDefaultSort = {
  columnName: 'id',
  ascending: true,
} as const

export default function BookingsTableRender() {
  const { data: searchParams, isLoading: isLoadingSearchParams } =
    useSearchParams(Route.searchParams)

  const pagination = searchParams?.pagination ?? bookingsTableDefaultPagination
  const sort = searchParams?.sort ?? bookingsTableDefaultSort

  const { data, isLoading, isPending, isFetching, status } = useBookings({
    pagination: pagination,
    sort: sort,
    enabled: !isLoadingSearchParams && Boolean(searchParams),
  })

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (!data?.data && !isFetching && !isPending && !isLoading)
    return <div>error...</div>

  if (searchParams && status === 'success' && data?.data) {
    return (
      <div className="grid grid-cols-1 gap-4">
        <BookingsTable data={data.data ?? []} columns={bookingsTableColumns} />

        <div className="flex justify-between">
          <BookingsTablePagination />
          <BookingsTableItemsPerPage />
        </div>
      </div>
    )
  }
  return null
}
