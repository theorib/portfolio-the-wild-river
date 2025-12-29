import { getToday } from '@/lib/utils/helpers';
import { getBookingsAfterDate } from '@/services/supabase/queries/bookings';
import { type TypedSupabaseClient } from '@/services/supabase/supabase.types';
import useSupabaseBrowser from '@/services/supabase/supabaseBrowser';
import { queryOptions, useQuery } from '@tanstack/react-query';
import { subDays } from 'date-fns';

type BookingsAfterDateQueryProps = {
	days?: number;
	supabaseClient: TypedSupabaseClient;
};

export const bookingsAfterDateQuery = ({ days = 7, supabaseClient }: BookingsAfterDateQueryProps) =>
	queryOptions({
		// eslint-disable-next-line @tanstack/query/exhaustive-deps
		queryKey: ['bookings', { bookingsAfterDate: subDays(getToday(), days) }],
		queryFn: () => getBookingsAfterDate({ date: subDays(getToday(), days), supabaseClient }),
	});

function useBookingsAfterDate({ days }: { days?: number }) {
	const supabaseClient = useSupabaseBrowser();

	return useQuery(bookingsAfterDateQuery({ days, supabaseClient }));
}

export default useBookingsAfterDate;
