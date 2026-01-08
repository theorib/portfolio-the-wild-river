import type {
	BookingAfterDate,
	BookingTodayActivity,
	BookingWithGuest,
	BookingWithGuestAndCabin,
	StayAfterDate,
} from '@/features/bookings/types';
import logger from '@/features/logger';
import { getToday } from '@/lib/utils/helpers';
import type { TypedSupabaseClient } from '@/services/supabase/supabase.types';

type GetBookingsProps = {
	supabaseClient: TypedSupabaseClient;
};

export const getBookings = async ({
	supabaseClient,
}: GetBookingsProps): Promise<{
	data: Array<BookingWithGuest>;
	count: number | null;
}> => {
	const query = supabaseClient
		.from('bookings')
		.select(`*, guestId(fullName, id, email)`, { count: 'exact' });

	const { data, error, count } = await query;

	if (error || !data) {
		logger
			.withMetadata({
				function: 'getBookings',
				supabaseData: data,
			})
			.withError(error)
			.error('Error getting bookings');

		throw error;
	}

	return { data, count };
};

export const getBookingById = async ({
	supabaseClient,
	bookingId,
}: {
	supabaseClient: TypedSupabaseClient;
	bookingId: number;
}): Promise<BookingWithGuestAndCabin> => {
	const { data, error } = await supabaseClient
		.from('bookings')
		.select(`*, guestId(*), cabinId(name)`)
		.eq('id', bookingId)
		.single();

	if (error || !data) {
		logger
			.withMetadata({
				function: 'getBookingById',
				supabaseData: data,
			})
			.withError(error)
			.error('Error getting booking');
		throw error;
	}

	return data;
};

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate({
	supabaseClient,
	date,
}: {
	supabaseClient: TypedSupabaseClient;
	date: Date;
}): Promise<Array<BookingAfterDate>> {
	const { data, error } = await supabaseClient
		.from('bookings')
		.select('created_at, totalPrice, extrasPrice, numNights')
		.gte('created_at', date.toISOString())
		.lte('created_at', getToday({ end: true }))
		.order('created_at');
	if (error || !data) {
		logger
			.withMetadata({
				function: 'getBookingsAfterDate',
				supabaseData: data,
			})
			.withError(error)
			.error('Error getting bookings');
		throw error;
	}

	return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate({
	supabaseClient,
	date,
}: {
	supabaseClient: TypedSupabaseClient;
	date: Date;
}): Promise<Array<StayAfterDate>> {
	const { data, error } = await supabaseClient
		.from('bookings')
		// .select('*')
		.select('*, guests(fullName)')
		.gte('startDate', date)
		.lte('startDate', getToday());

	if (error || !data) {
		logger
			.withMetadata({
				function: 'getStaysAfterDate',
				supabaseData: data,
			})
			.withError(error)
			.error('Error getting bookings');
		throw error;
	}

	return data;
}

// Activity means that there is a check in or a check out today
export async function getBookingsTodaysActivities({
	supabaseClient,
}: {
	supabaseClient: TypedSupabaseClient;
}): Promise<Array<BookingTodayActivity>> {
	const { data, error } = await supabaseClient
		.from('bookings')
		.select(`*, guestId(fullName, nationality, countryFlag)`)
		.or(
			`and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`,
		)
		.order('created_at');

	// Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
	// (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
	// (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

	if (error || !data) {
		logger
			.withMetadata({
				function: 'getBookingsTodayActivity',
				supabaseData: data,
			})
			.withError(error)
			.error('Error getting stays');
		throw error;
	}

	return data;
}
