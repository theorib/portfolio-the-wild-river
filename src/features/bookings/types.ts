import type { BookingsStatus } from '@/features/bookings/schema';
import type { ArrayElement, PaginationAndSort } from '@/lib/types';
import type { getBookings } from '@/services/supabase/queries/bookings';
import type { Database, TablesUpdate } from '@/services/supabase/supabase.auto.types';

export type BookingsAutoRow = Database['public']['Tables']['bookings']['Row'];

export type BookingWithGuest = BookingsAutoRow & {
	guestId: Pick<Database['public']['Tables']['guests']['Row'], 'fullName' | 'id' | 'email'> | null;
};

export type BookingWithGuestAndCabin = BookingsAutoRow & {
	guestId: Database['public']['Tables']['guests']['Row'] | null;
	cabinId: Pick<Database['public']['Tables']['cabins']['Row'], 'name'> | null;
};

export type BookingAfterDate = Pick<
	BookingsAutoRow,
	'created_at' | 'totalPrice' | 'extrasPrice' | 'numNights'
>;

export type StayAfterDate = BookingsAutoRow & {
	guests: Pick<Database['public']['Tables']['guests']['Row'], 'fullName'> | null;
};

export type BookingTodayActivity = BookingsAutoRow & {
	guestId: Pick<
		Database['public']['Tables']['guests']['Row'],
		'fullName' | 'nationality' | 'countryFlag'
	> | null;
};

export type Bookings = Awaited<ReturnType<typeof getBookings>>['data'];
export type Booking = ArrayElement<Bookings>;
export type BookingsSearchParams = PaginationAndSort<Booking>;
export type BookingUpdate = TablesUpdate<'bookings'> & {
	status: BookingsStatus;
};
