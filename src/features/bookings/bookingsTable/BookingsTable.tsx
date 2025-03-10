'use client'

import { bookingsTableColumns } from '@/features/bookings/bookingsTable/BookingsTableColumns'
import DataTable from '@/features/dataTable/components/DataTable'
import useBookings from '@/features/bookings/hooks/useBookings'

import useBookingsTableSearchParams from '@/features/bookings/hooks/useBookingsTableSearchParams'

export default function BookingsTable() {
  const { data: searchParams, isLoading: isLoadingSearchParams } =
    useBookingsTableSearchParams()

  const { data, isLoading, isPending, isFetching, status } = useBookings({
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
        <DataTable
          data={data.data || []}
          rowCount={data.count || 0}
          columns={bookingsTableColumns}
          defaultColumnVisibility={{ bookingId: false }}
        />

        <div className="flex justify-between">
          {/* <BookingsTablePagination /> */}
          {/* <BookingsTableItemsPerPage /> */}
        </div>
      </div>
    )
  }
  return null
}
