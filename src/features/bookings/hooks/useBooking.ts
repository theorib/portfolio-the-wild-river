import { getBookingById } from '@/services/supabase/queries/bookings';
import { type TypedSupabaseClient } from '@/services/supabase/supabase.types';
import useSupabaseBrowser from '@/services/supabase/supabaseBrowser';
import { queryOptions, useQuery, useQueryClient } from '@tanstack/react-query';

type BookingQueryProps = {
	bookingId: number;
	supabaseClient: TypedSupabaseClient;
};

export const bookingQuery = ({ supabaseClient, bookingId }: BookingQueryProps) =>
	queryOptions({
		// eslint-disable-next-line @tanstack/query/exhaustive-deps
		queryKey: ['booking', { bookingId }],
		queryFn: () => getBookingById({ supabaseClient, bookingId }),
		refetchInterval: 5 * 1000,
	});

export default function useBooking({ bookingId }: { bookingId: number }) {
	const supabaseClient = useSupabaseBrowser();
	const queryClient = useQueryClient();
	return useQuery({
		...bookingQuery({ supabaseClient, bookingId }),
		// use initial data from prefetched data if available
		initialData: () =>
			queryClient.getQueryData(bookingQuery({ supabaseClient, bookingId }).queryKey),
	});
}
