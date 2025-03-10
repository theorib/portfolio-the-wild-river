import { getBookings } from '@/services/supabase/queries/bookings'
import { keepPreviousData, queryOptions, useQuery } from '@tanstack/react-query'
import type { TypedSupabaseClient } from '@/services/supabase/supabase.types'
import useSupabaseBrowser from '@/services/supabase/supabaseBrowser'

interface UseBookingsProps {
  enabled?: boolean
}

interface BookingsQueryProps extends UseBookingsProps {
  supabaseClient: TypedSupabaseClient
}

export const bookingsQuery = ({ supabaseClient }: BookingsQueryProps) =>
  queryOptions({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ['bookings'],
    queryFn: () => getBookings({ supabaseClient }),
    placeholderData: keepPreviousData,
  })

export default function useBookings({ enabled = true }: UseBookingsProps = {}) {
  const supabaseClient = useSupabaseBrowser()
  return useQuery({
    ...bookingsQuery({ supabaseClient }),
    enabled,
  })
}
