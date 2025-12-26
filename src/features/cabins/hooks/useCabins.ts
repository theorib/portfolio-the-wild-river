import { getCabins } from '@/services/supabase/queries/cabins';
import type { TypedSupabaseClient } from '@/services/supabase/supabase.types';
import useSupabaseBrowser from '@/services/supabase/supabaseBrowser';
import { keepPreviousData, queryOptions, useQuery } from '@tanstack/react-query';

interface UseCabinsProps {
	enabled?: boolean;
}

interface CabinsQueryProps extends UseCabinsProps {
	supabaseClient: TypedSupabaseClient;
}

export const cabinsQuery = ({ supabaseClient }: CabinsQueryProps) =>
	queryOptions({
		// eslint-disable-next-line @tanstack/query/exhaustive-deps
		queryKey: ['cabins'],
		queryFn: () => getCabins({ supabaseClient }),
		placeholderData: keepPreviousData,
	});

export default function useCabins({ enabled = true }: UseCabinsProps = {}) {
	const supabaseClient = useSupabaseBrowser();
	return useQuery({
		...cabinsQuery({ supabaseClient }),
		enabled,
	});
}
