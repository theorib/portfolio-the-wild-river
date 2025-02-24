'use client'

import { bookingsColumns } from '@/features/bookings/components/BookingsColumns'
import BookingsDataTable from '@/features/bookings/components/BookingsDataTable'
import useBookings from '@/features/bookings/hooks/useBookings'

export default function BookingsTable() {
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
        <BookingsDataTable data={bookings ?? []} columns={bookingsColumns} />
      </div>
    )
}
