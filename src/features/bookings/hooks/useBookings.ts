import { getBookings } from '@/features/bookings/actions'
import { queryOptions, useQuery } from '@tanstack/react-query'
import { type TypedSupabaseClient } from '@/services/supabase/supabase.types'
import useSupabaseBrowser from '@/services/supabase/supabaseBrowser'

type BookingsQueryProps = {
  supabaseClient: TypedSupabaseClient
}

export const bookingsQuery = ({ supabaseClient }: BookingsQueryProps) =>
  queryOptions({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ['bookings'],
    queryFn: () => getBookings({ supabaseClient }),
  })

export default function useBookings() {
  const supabaseClient = useSupabaseBrowser()
  return useQuery(bookingsQuery({ supabaseClient }))
}
