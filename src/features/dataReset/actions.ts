'use server';

import { isFuture, isPast, isToday } from 'date-fns';

import { bookings } from '@/features/dataReset/data/data-bookings';
import { cabins } from '@/features/dataReset/data/data-cabins';
import { guests } from '@/features/dataReset/data/data-guests';
import logger from '@/features/logger';
import { subtractDates } from '@/lib/utils/helpers';
import { createClient } from '@/services/supabase/supabaseServer';
import { revalidatePath } from 'next/cache';

interface DataResetReturn {
	success: boolean;
	error: string | null;
	message?: string;
}

/**
 * Server action to reset all data (guests, cabins, bookings)
 * This keeps all demo data and database operations server-side for security
 */
export async function resetAllData(): Promise<DataResetReturn> {
	try {
		const supabase = await createClient();

		// Verify user is authenticated
		const {
			data: { user },
		} = await supabase.auth.getUser();
		if (!user) {
			logger.warn('Unauthorized data reset attempt - user not authenticated');
			return { success: false, error: 'Unauthorized: Please log in to reset data' };
		}

		logger
			.withContext({ userId: user.id, email: user.email })
			.info('Starting full data reset by user');

		// Delete in correct order (bookings first due to foreign keys)
		const { error: deleteBookingsError } = await supabase.from('bookings').delete().gt('id', 0);
		if (deleteBookingsError) {
			logger.withError(deleteBookingsError).error('Failed to delete bookings');
			return { success: false, error: 'Failed to delete bookings' };
		}

		const { error: deleteGuestsError } = await supabase.from('guests').delete().gt('id', 0);
		if (deleteGuestsError) {
			logger.withError(deleteGuestsError).error('Failed to delete guests');
			return { success: false, error: 'Failed to delete guests' };
		}

		const { error: deleteCabinsError } = await supabase.from('cabins').delete().gt('id', 0);
		if (deleteCabinsError) {
			logger.withError(deleteCabinsError).error('Failed to delete cabins');
			return { success: false, error: 'Failed to delete cabins' };
		}

		// Insert in correct order (guests and cabins first, then bookings)
		const { error: insertGuestsError } = await supabase.from('guests').insert(guests);
		if (insertGuestsError) {
			logger.withError(insertGuestsError).error('Failed to insert guests');
			return { success: false, error: 'Failed to insert guests' };
		}

		const { error: insertCabinsError } = await supabase.from('cabins').insert(cabins);
		if (insertCabinsError) {
			logger.withError(insertCabinsError).error('Failed to insert cabins');
			return { success: false, error: 'Failed to insert cabins' };
		}

		// Prepare bookings with proper IDs and calculated fields
		const { data: guestsIds } = await supabase.from('guests').select('id').order('id');
		const allGuestIds = guestsIds?.map((guest) => guest.id);

		const { data: cabinsIds } = await supabase.from('cabins').select('id').order('id');
		const allCabinIds = cabinsIds?.map((cabin) => cabin.id);

		const finalBookings = bookings.map((booking) => {
			const cabin = cabins.at(booking.cabinId - 1);
			if (!cabin) {
				throw new Error(`Cabin not found for booking with cabinId: ${booking.cabinId}`);
			}

			const numNights = subtractDates(new Date(booking.endDate), new Date(booking.startDate));
			const cabinPrice = numNights * (cabin.regularPrice - cabin.discount);
			const extrasPrice = booking.hasBreakfast ? numNights * 15 * booking.numGuests : 0;
			const totalPrice = cabinPrice + extrasPrice;

			let status: 'checked-out' | 'unconfirmed' | 'checked-in' = 'unconfirmed';
			if (isPast(new Date(booking.endDate)) && !isToday(new Date(booking.endDate))) {
				status = 'checked-out';
			} else if (isFuture(new Date(booking.startDate)) || isToday(new Date(booking.startDate))) {
				status = 'unconfirmed';
			} else if (
				(isFuture(new Date(booking.endDate)) || isToday(new Date(booking.endDate))) &&
				isPast(new Date(booking.startDate)) &&
				!isToday(new Date(booking.startDate))
			) {
				status = 'checked-in';
			}

			return {
				...booking,
				numNights,
				cabinPrice,
				extrasPrice,
				totalPrice,
				guestId: allGuestIds?.at(booking.guestId - 1),
				cabinId: allCabinIds?.at(booking.cabinId - 1),
				status,
			};
		});

		const { error: insertBookingsError } = await supabase.from('bookings').insert(finalBookings);
		if (insertBookingsError) {
			logger.withError(insertBookingsError).error('Failed to insert bookings');
			return { success: false, error: 'Failed to insert bookings' };
		}

		logger
			.withContext({ userId: user.id, email: user.email })
			.info('Successfully completed full data reset');

		// Revalidate all relevant paths
		revalidatePath('/app/bookings', 'page');
		revalidatePath('/app/cabins', 'page');
		revalidatePath('/app/dashboard', 'page');

		return {
			success: true,
			error: null,
			message: 'All data successfully reset',
		};
	} catch (err) {
		logger.withError(err).error('Unexpected error during full data reset');
		return {
			success: false,
			error: err instanceof Error ? err.message : 'Unexpected error during data reset',
		};
	}
}

/**
 * Server action to reset only bookings data
 * This keeps all demo data and database operations server-side for security
 */
export async function resetBookingsData(): Promise<DataResetReturn> {
	try {
		const supabase = await createClient();

		// Verify user is authenticated
		const {
			data: { user },
		} = await supabase.auth.getUser();
		if (!user) {
			logger.warn('Unauthorized bookings reset attempt - user not authenticated');
			return { success: false, error: 'Unauthorized: Please log in to reset data' };
		}

		logger
			.withContext({ userId: user.id, email: user.email })
			.info('Starting bookings data reset by user');

		// Delete existing bookings
		const { error: deleteError } = await supabase.from('bookings').delete().gt('id', 0);
		if (deleteError) {
			logger.withError(deleteError).error('Failed to delete bookings');
			return { success: false, error: 'Failed to delete bookings' };
		}

		// Prepare bookings with proper IDs and calculated fields
		const { data: guestsIds } = await supabase.from('guests').select('id').order('id');
		const allGuestIds = guestsIds?.map((guest) => guest.id);

		const { data: cabinsIds } = await supabase.from('cabins').select('id').order('id');
		const allCabinIds = cabinsIds?.map((cabin) => cabin.id);

		const finalBookings = bookings.map((booking) => {
			const cabin = cabins.at(booking.cabinId - 1);
			if (!cabin) {
				throw new Error(`Cabin not found for booking with cabinId: ${booking.cabinId}`);
			}

			const numNights = subtractDates(new Date(booking.endDate), new Date(booking.startDate));
			const cabinPrice = numNights * (cabin.regularPrice - cabin.discount);
			const extrasPrice = booking.hasBreakfast ? numNights * 15 * booking.numGuests : 0;
			const totalPrice = cabinPrice + extrasPrice;

			let status: 'checked-out' | 'unconfirmed' | 'checked-in' = 'unconfirmed';
			if (isPast(new Date(booking.endDate)) && !isToday(new Date(booking.endDate))) {
				status = 'checked-out';
			} else if (isFuture(new Date(booking.startDate)) || isToday(new Date(booking.startDate))) {
				status = 'unconfirmed';
			} else if (
				(isFuture(new Date(booking.endDate)) || isToday(new Date(booking.endDate))) &&
				isPast(new Date(booking.startDate)) &&
				!isToday(new Date(booking.startDate))
			) {
				status = 'checked-in';
			}

			return {
				...booking,
				numNights,
				cabinPrice,
				extrasPrice,
				totalPrice,
				guestId: allGuestIds?.at(booking.guestId - 1),
				cabinId: allCabinIds?.at(booking.cabinId - 1),
				status,
			};
		});

		const { error: insertError } = await supabase.from('bookings').insert(finalBookings);
		if (insertError) {
			logger.withError(insertError).error('Failed to insert bookings');
			return { success: false, error: 'Failed to insert bookings' };
		}

		logger
			.withContext({ userId: user.id, email: user.email })
			.info('Successfully completed bookings data reset');

		// Revalidate bookings-related paths
		revalidatePath('/app/bookings', 'page');
		revalidatePath('/app/dashboard', 'page');

		return {
			success: true,
			error: null,
			message: 'Bookings data successfully reset',
		};
	} catch (err) {
		logger.withError(err).error('Unexpected error during bookings data reset');
		return {
			success: false,
			error: err instanceof Error ? err.message : 'Unexpected error during data reset',
		};
	}
}
