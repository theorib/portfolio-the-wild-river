'use client';

import { useState } from 'react';

import { resetAllData, resetBookingsData } from '@/features/dataReset/actions';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

/**
 * Hook to trigger data reset operations via secure server actions
 * All database operations and demo data are kept server-side for security
 */
const useDataReset = () => {
	const [isLoading, setIsLoading] = useState(false);
	const queryClient = useQueryClient();

	async function uploadAll() {
		setIsLoading(true);

		const result = await resetAllData();

		if (result.success) {
			await queryClient.invalidateQueries({ refetchType: 'all' });
			toast.success(result.message || 'All data successfully reset');
		} else {
			toast.error(result.error || 'Failed to reset data');
		}

		setIsLoading(false);
	}

	async function uploadBookings() {
		setIsLoading(true);

		const result = await resetBookingsData();

		if (result.success) {
			await queryClient.invalidateQueries({ queryKey: ['bookings'] });
			toast.success(result.message || 'Bookings data successfully reset');
		} else {
			toast.error(result.error || 'Failed to reset bookings');
		}

		setIsLoading(false);
	}

	return { uploadAll, uploadBookings, isLoading };
};

export default useDataReset;
