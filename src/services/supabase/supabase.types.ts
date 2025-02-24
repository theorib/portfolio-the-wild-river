import { type Database } from '@/services/supabase/supabase.auto.types'
import { type SupabaseClient } from '@supabase/supabase-js'

export type TypedSupabaseClient = SupabaseClient<Database>
