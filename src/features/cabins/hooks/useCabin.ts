import { getCabinById } from '@/services/supabase/queries/cabins';
import { type TypedSupabaseClient } from '@/services/supabase/supabase.types';
import useSupabaseBrowser from '@/services/supabase/supabaseBrowser';
import { queryOptions, useQuery, useQueryClient } from '@tanstack/react-query';

type CabinQueryProps = {
	cabinId: number;
	supabaseClient: TypedSupabaseClient;
};

export const cabinQuery = ({ supabaseClient, cabinId }: CabinQueryProps) =>
	queryOptions({
		// eslint-disable-next-line @tanstack/query/exhaustive-deps
		queryKey: ['booking', { cabinId }],
		queryFn: () => getCabinById({ supabaseClient, cabinId }),
		refetchInterval: 5 * 1000,
	});

export default function useCabin({ cabinId }: { cabinId: number }) {
	const supabaseClient = useSupabaseBrowser();
	const queryClient = useQueryClient();
	return useQuery({
		...cabinQuery({ supabaseClient, cabinId }),
		// use initial data from prefetched data if available
		initialData: () => queryClient.getQueryData(cabinQuery({ supabaseClient, cabinId }).queryKey),
	});
}
