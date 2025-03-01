import { type getBookings } from '@/services/supabase/queries/bookings'
import { type Database } from '@/services/supabase/supabase.auto.types'
import { type ArrayElement } from '@/shared/types'
import { type SupabaseClient } from '@supabase/supabase-js'
export type TypedSupabaseClient = SupabaseClient<Database>
export type BookingsAutoRow = Database['public']['Tables']['bookings']['Row']
export type Bookings = Awaited<ReturnType<typeof getBookings>>
export type Booking = ArrayElement<Bookings>

export type Range = {
  startIndex: number
  endIndex: number
}

export type Sort<TData, TKey extends keyof TData = keyof TData> = {
  columnName: TKey
  ascending: boolean
}

export type PaginationLimit<TData, Tkey extends keyof TData = keyof TData> = {
  numberOfItems: number
  columnName: Tkey
  lastValue: TData[Tkey]
}
