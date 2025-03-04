'use client'

import { bookingsTableColumns } from '@/features/bookings/bookingsTable/BookingsTableColumns'
import BookingsTable from '@/features/bookings/bookingsTable/BookingsTable'
import useBookings from '@/features/bookings/hooks/useBookings'

import { BookingsTablePagination } from '@/features/bookings/bookingsTable/BookingsTablePagination'
import { BookingsTableItemsPerPage } from '@/features/bookings/bookingsTable/BookingsTableItemsPerPage'
import useBookingsTableSearchParams from '@/features/bookings/hooks/useBookingsTableSearchParams'

export default function BookingsTableRender() {
  const { data: searchParams, isLoading: isLoadingSearchParams } =
    useBookingsTableSearchParams()

  const pagination = searchParams?.pagination
  const sort = searchParams?.sort

  const { data, isLoading, isPending, isFetching, status } = useBookings({
    pagination: pagination,
    sort: sort,
    enabled: !isLoadingSearchParams,
  })

  if (isLoading || isLoadingSearchParams) {
    return <div>Loading...</div>
  }
  if (!searchParams && !isFetching && !isPending && !isLoading)
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
