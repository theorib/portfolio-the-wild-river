import { type getBookings } from '@/services/supabase/queries/bookings'
import { type Database } from '@/services/supabase/supabase.auto.types'
import type { PaginationAndSort, ArrayElement } from '@/shared/types'
import { type SupabaseClient } from '@supabase/supabase-js'
export type TypedSupabaseClient = SupabaseClient<Database>
export type BookingsAutoRow = Database['public']['Tables']['bookings']['Row']
export type Bookings = Awaited<ReturnType<typeof getBookings>>['data']
export type Booking = ArrayElement<Bookings>

export type BookingsSearchParams = PaginationAndSort<Booking>
