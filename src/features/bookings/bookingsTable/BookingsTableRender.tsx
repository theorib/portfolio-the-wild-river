'use client'

import { bookingsTableColumns } from '@/features/bookings/bookingsTable/BookingsTableColumns'
import BookingsTable from '@/features/bookings/bookingsTable/BookingsTable'
import useBookings from '@/features/bookings/hooks/useBookings'

export default function BookingsTableRender() {
  const {
    data: bookings,
    isLoading,
    isPending,
    isFetching,
    status,
  } = useBookings()

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (!bookings && !isFetching && !isPending && !isLoading)
    return <div>error...</div>

  if (status === 'success' && bookings)
    return (
      <div>
        <BookingsTable data={bookings ?? []} columns={bookingsTableColumns} />
      </div>
    )
}
