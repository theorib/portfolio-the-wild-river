import { getBookings } from '@/services/supabase/queries/bookings'
import { queryOptions, useQuery } from '@tanstack/react-query'
import {
  type Sort,
  type PaginationLimit,
  type TypedSupabaseClient,
  type BookingsAutoRow,
} from '@/services/supabase/supabase.types'
import useSupabaseBrowser from '@/services/supabase/supabaseBrowser'

interface UseBookingsProps {
  sort?: Sort<BookingsAutoRow>
  pagination?: PaginationLimit<BookingsAutoRow>
}

interface BookingsQueryProps extends UseBookingsProps {
  supabaseClient: TypedSupabaseClient
}

export const bookingsQuery = ({
  supabaseClient,
  sort,
  pagination,
}: BookingsQueryProps) =>
  queryOptions({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ['bookings', sort, pagination],
    queryFn: () => getBookings({ supabaseClient, sort, pagination }),
  })

export default function useBookings({
  sort,
  pagination,
}: UseBookingsProps = {}) {
  const supabaseClient = useSupabaseBrowser()
  return useQuery(bookingsQuery({ supabaseClient, sort, pagination }))
}
