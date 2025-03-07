import { getBookings } from '@/services/supabase/queries/bookings'
import { keepPreviousData, queryOptions, useQuery } from '@tanstack/react-query'
import type {
  TypedSupabaseClient,
  BookingsAutoRow,
} from '@/services/supabase/supabase.types'
import useSupabaseBrowser from '@/services/supabase/supabaseBrowser'
import type { Pagination, Sort } from '@/shared/types'
import { DEFAULT_BOOKING_ITEMS_PER_PAGE } from '@/shared/constants'

export const bookingsTableDefaultPagination = {
  columnName: 'id',
  range: {
    startIndex: 0,
    endIndex: DEFAULT_BOOKING_ITEMS_PER_PAGE - 1,
  },
  numberOfItems: DEFAULT_BOOKING_ITEMS_PER_PAGE,
} as const

export const bookingsTableDefaultSort = {
  columnName: 'id',
  ascending: true,
} as const

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
  sort = bookingsTableDefaultSort,
  pagination = bookingsTableDefaultPagination,
}: BookingsQueryProps) =>
  queryOptions({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ['bookings', sort, pagination],
    queryFn: () => getBookings({ supabaseClient, sort, pagination }),
    placeholderData: keepPreviousData,
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
