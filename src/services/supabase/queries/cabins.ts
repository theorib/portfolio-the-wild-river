import logger from '@/features/logger';
import type { TypedSupabaseClient } from '@/services/supabase/supabase.types';
// import { getToday } from '@/lib/utils/helpers';

export const getCabins = async ({ supabaseClient }: { supabaseClient: TypedSupabaseClient }) => {
	const query = supabaseClient.from('cabins').select(`*`, { count: 'exact' });

	const { data, error, count } = await query;

	if (error || !data) {
		logger
			.withMetadata({
				function: 'getCabins',
				supabaseData: data,
			})
			.withError(error)
			.error('Error getting cabins');

		throw error;
	}

	return { data, count };
};

export const getCabinById = async ({
	supabaseClient,
	cabinId,
}: {
	supabaseClient: TypedSupabaseClient;
	cabinId: number;
}) => {
	const { data, error } = await supabaseClient
		.from('cabins')
		.select(`*`)
		.eq('id', cabinId)
		.single();

	if (error || !data) {
		logger
			.withMetadata({
				function: 'getCabinById',
				supabaseData: data,
			})
			.withError(error)
			.error('Error getting cabin');
		throw error;
	}

	return data;
};
