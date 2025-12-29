import logger from '@/features/logger';
import type { TypedSupabaseClient } from '@/services/supabase/supabase.types';
import type { CabinsUpdate } from '../../../features/cabins/types';

export type UpdateCabinByIdProps = {
	supabaseClient: TypedSupabaseClient;
	cabinId: number;
	cabinData: CabinsUpdate;
};

export const updateCabinById = async ({
	supabaseClient,
	cabinId,
	cabinData,
}: UpdateCabinByIdProps) => {
	const { data, error } = await supabaseClient
		.from('cabins')
		.update(cabinData)
		.eq('id', cabinId)
		.select()
		.single();

	if (error || !data) {
		logger
			.withMetadata({
				function: 'updateCabinById',
				supabaseData: data,
			})
			.withError(error || new Error('no data'))
			.error(`Error updating cabin ${cabinId}`);
		throw error;
	}

	return data;
};

export const deleteCabinById = async ({
	supabaseClient,
	cabinId,
}: {
	supabaseClient: TypedSupabaseClient;
	cabinId: number;
}) => {
	const { data, error } = await supabaseClient.from('cabins').delete().eq('id', cabinId);

	if (error) {
		logger
			.withMetadata({
				function: 'deleteCabinById',
				supabaseData: data,
			})
			.withError(error)
			.error(`Error deleting cabin ${cabinId}`);
		throw error;
	}
	return data;
};
