import { type getBookings } from '@/services/supabase/queries/bookings'
import { type Database } from '@/services/supabase/supabase.auto.types'
import { type ArrayElement } from '@/shared/types'
import { type SupabaseClient } from '@supabase/supabase-js'
export type TypedSupabaseClient = SupabaseClient<Database>
export type Bookings = Awaited<ReturnType<typeof getBookings>>
export type Booking = ArrayElement<Bookings>
