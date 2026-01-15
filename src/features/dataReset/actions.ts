'use server';

import { readFile } from 'fs/promises';
import path from 'path';

import { isFuture, isPast, isToday } from 'date-fns';

import { bookings } from '@/features/dataReset/data/data-bookings';
import { cabins } from '@/features/dataReset/data/data-cabins';
import { guests } from '@/features/dataReset/data/data-guests';
import logger from '@/features/logger';
import { subtractDates } from '@/lib/utils/helpers';
import { deleteAllFilesInBucket } from '@/services/supabase/storage/images';
import { createClient } from '@/services/supabase/supabaseServer';
import type { TypedSupabaseClient } from '@/services/supabase/supabase.types';
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

		// Reset cabin images in storage
		await deleteAllFilesInBucket({ supabaseClient: supabase, bucket: CABIN_IMAGES_BUCKET });
		const imageUrlMap = await uploadCabinImagesToStorage(supabase);

		// Prepare cabins with fresh image URLs
		const cabinsWithFreshUrls = cabins.map((cabin) => {
			const imageFilename = `cabin-${cabin.name}.webp`;
			return {
				...cabin,
				image: imageUrlMap[imageFilename] || cabin.image,
			};
		});

		// Insert in correct order (guests and cabins first, then bookings)
		const { error: insertGuestsError } = await supabase.from('guests').insert(guests);
		if (insertGuestsError) {
			logger.withError(insertGuestsError).error('Failed to insert guests');
			return { success: false, error: 'Failed to insert guests' };
		}

		const { error: insertCabinsError } = await supabase.from('cabins').insert(cabinsWithFreshUrls);
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

const CABIN_IMAGES_BUCKET = 'cabin-images';
const CABIN_IMAGE_FILENAMES = [
	'cabin-001.webp',
	'cabin-002.webp',
	'cabin-003.webp',
	'cabin-004.webp',
	'cabin-005.webp',
	'cabin-006.webp',
	'cabin-007.webp',
	'cabin-008.webp',
] as const;

export async function uploadCabinImagesToStorage(
	supabaseClient: TypedSupabaseClient
): Promise<Record<string, string>> {
	const imageUrlMap: Record<string, string> = {};
	const timestamp = Date.now();

	for (const filename of CABIN_IMAGE_FILENAMES) {
		const imagePath = path.join(process.cwd(), 'src/features/dataReset/data/cabins', filename);

		const fileBuffer = await readFile(imagePath);

		// Include timestamp in filename to ensure unique URLs and prevent Next.js image cache issues
		const [name, ext] = filename.split('.');
		const timestampedFilename = `${name}-${timestamp}.${ext}`;
		const file = new File([fileBuffer], timestampedFilename, { type: 'image/webp' });

		const { data, error } = await supabaseClient.storage
			.from(CABIN_IMAGES_BUCKET)
			.upload(timestampedFilename, file, {
				cacheControl: '3600',
				upsert: false,
			});

		if (error) {
			logger
				.withMetadata({ filename: timestampedFilename, bucket: CABIN_IMAGES_BUCKET })
				.withError(error)
				.error('Failed to upload cabin image');
			throw error;
		}

		const {
			data: { publicUrl },
		} = supabaseClient.storage.from(CABIN_IMAGES_BUCKET).getPublicUrl(data.path);

		// Use original filename as key for mapping to cabin records
		imageUrlMap[filename] = publicUrl;
	}

	logger
		.withMetadata({ imageCount: CABIN_IMAGE_FILENAMES.length })
		.info('Successfully uploaded all cabin images to storage');

	return imageUrlMap;
}

export async function resetCabinImages(): Promise<DataResetReturn> {
	try {
		const supabase = await createClient();

		const {
			data: { user },
		} = await supabase.auth.getUser();
		if (!user) {
			logger.warn('Unauthorized cabin images reset attempt - user not authenticated');
			return { success: false, error: 'Unauthorized: Please log in to reset data' };
		}

		logger
			.withContext({ userId: user.id, email: user.email })
			.info('Starting cabin images reset by user');

		await deleteAllFilesInBucket({ supabaseClient: supabase, bucket: CABIN_IMAGES_BUCKET });
		const imageUrlMap = await uploadCabinImagesToStorage(supabase);

		// Update cabin records with new cache-busted image URLs
		const { data: existingCabins } = await supabase.from('cabins').select('id, name');
		if (existingCabins) {
			for (const cabin of existingCabins) {
				const imageFilename = `cabin-${cabin.name}.webp`;
				const newImageUrl = imageUrlMap[imageFilename];
				if (newImageUrl) {
					await supabase.from('cabins').update({ image: newImageUrl }).eq('id', cabin.id);
				}
			}
		}

		logger
			.withContext({ userId: user.id, email: user.email })
			.info('Successfully completed cabin images reset');

		revalidatePath('/app/cabins', 'page');

		return {
			success: true,
			error: null,
			message: 'Cabin images successfully reset',
		};
	} catch (err) {
		logger.withError(err).error('Unexpected error during cabin images reset');
		return {
			success: false,
			error: err instanceof Error ? err.message : 'Unexpected error during cabin images reset',
		};
	}
}
