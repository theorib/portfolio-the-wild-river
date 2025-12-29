import type { BookingsStatus } from '@/features/bookings/schema';
import type { getBookings } from '@/services/supabase/queries/bookings';
import type { Database, TablesUpdate } from '@/services/supabase/supabase.auto.types';
import type { ArrayElement, PaginationAndSort } from '@/shared/types';

export type BookingsAutoRow = Database['public']['Tables']['bookings']['Row'];
export type Bookings = Awaited<ReturnType<typeof getBookings>>['data'];
export type Booking = ArrayElement<Bookings>;
export type BookingsSearchParams = PaginationAndSort<Booking>;
export type BookingUpdate = TablesUpdate<'bookings'> & {
	status: BookingsStatus;
};
