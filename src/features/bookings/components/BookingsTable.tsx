'use client'

import useBookings from '@/features/bookings/hooks/useBookings'

export default function BookingsTable() {
  const { data: bookings, isLoading } = useBookings()
  return (
    <pre className="max-w-prose overflow-auto rounded-lg bg-slate-100 p-4">
      {JSON.stringify(bookings, null, 2)}
    </pre>
  )
}
