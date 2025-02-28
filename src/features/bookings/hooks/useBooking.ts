import { getBookingById } from '@/services/supabase/queries/bookings'
import { queryOptions, useQuery, useQueryClient } from '@tanstack/react-query'
import { type TypedSupabaseClient } from '@/services/supabase/supabase.types'
import useSupabaseBrowser from '@/services/supabase/supabaseBrowser'

type BookingQueryProps = {
  bookingId: number
  supabaseClient: TypedSupabaseClient
}

export const bookingQuery = ({
  supabaseClient,
  bookingId,
}: BookingQueryProps) =>
  queryOptions({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ['booking', { bookingId }],
    queryFn: () => getBookingById({ supabaseClient, bookingId }),
    refetchInterval: 5 * 1000,
  })

export default function useBooking({ bookingId }: { bookingId: number }) {
  const supabaseClient = useSupabaseBrowser()
  const queryClient = useQueryClient()
  return useQuery({
    ...bookingQuery({ supabaseClient, bookingId }),
    // use initial data from prefetched data if available
    initialData: () =>
      queryClient.getQueryData(
        bookingQuery({ supabaseClient, bookingId }).queryKey,
      ),
  })
}
