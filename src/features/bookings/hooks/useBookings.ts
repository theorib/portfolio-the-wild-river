import { getBookings } from '@/services/supabase/queries/bookings'
import { queryOptions, useQuery } from '@tanstack/react-query'
import type {
  TypedSupabaseClient,
  BookingsAutoRow,
} from '@/services/supabase/supabase.types'
import useSupabaseBrowser from '@/services/supabase/supabaseBrowser'
import type { Pagination, Sort } from '@/shared/types'

interface UseBookingsProps {
  sort?: Sort<BookingsAutoRow>
  pagination?: Pagination<BookingsAutoRow>
  enabled?: boolean
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
  enabled = true,
}: UseBookingsProps = {}) {
  const supabaseClient = useSupabaseBrowser()
  return useQuery({
    ...bookingsQuery({ supabaseClient, sort, pagination }),
    enabled,
  })
}
