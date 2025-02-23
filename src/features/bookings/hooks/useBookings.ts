import { getBookings } from '@/features/bookings/actions'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const bookingsQuery = queryOptions({
  queryKey: ['bookings'],
  queryFn: getBookings,
})

export default function useBookings() {
  return useQuery(bookingsQuery)
}
