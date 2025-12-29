import { getToday } from '@/lib/utils/helpers';
import { getBookingsAfterDate } from '@/services/supabase/queries/bookings';
import { type TypedSupabaseClient } from '@/services/supabase/supabase.types';
import useSupabaseBrowser from '@/services/supabase/supabaseBrowser';
import { queryOptions, useQuery } from '@tanstack/react-query';
import { subDays } from 'date-fns';

type RecentBookingsQueryProps = {
	date: Date;
	supabaseClient: TypedSupabaseClient;
};

export const recentBookingsQuery = ({ date, supabaseClient }: RecentBookingsQueryProps) =>
	queryOptions({
		// eslint-disable-next-line @tanstack/query/exhaustive-deps
		queryKey: ['bookings', { bookingsAfterDate: date }],
		queryFn: () => getBookingsAfterDate({ date, supabaseClient }),
	});

function useRecentBookings() {
	const supabaseClient = useSupabaseBrowser();
	// const [searchParams] = useSearchParams()
	// const numDays = !searchParams.get('last')
	//   ? 7
	//   : Number(searchParams.get('last'))
	// const queryDate = subDays(getToday(), numDays)
	const queryDate = subDays(getToday(), 7);

	return useQuery(recentBookingsQuery({ date: queryDate, supabaseClient }));
}

export default useRecentBookings;
