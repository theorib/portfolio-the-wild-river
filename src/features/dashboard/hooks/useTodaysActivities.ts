import { getBookingsTodaysActivities } from '@/services/supabase/queries/bookings';
import { type TypedSupabaseClient } from '@/services/supabase/supabase.types';
import useSupabaseBrowser from '@/services/supabase/supabaseBrowser';
import { getToday } from '@/shared/lib/utils/helpers';
import { queryOptions, useQuery } from '@tanstack/react-query';

type TodaysActivitiesQueryProps = {
	supabaseClient: TypedSupabaseClient;
};

export const todaysActivitiesQuery = ({ supabaseClient }: TodaysActivitiesQueryProps) =>
	queryOptions({
		// eslint-disable-next-line @tanstack/query/exhaustive-deps
		queryKey: ['todays-activities', { date: getToday() }],
		queryFn: () => getBookingsTodaysActivities({ supabaseClient }),
	});

function useTodaysActivities() {
	const supabaseClient = useSupabaseBrowser();

	return useQuery(todaysActivitiesQuery({ supabaseClient }));
}

export default useTodaysActivities;
