import { type Database } from '@/services/supabase/supabase.types'
import { env } from '@/shared/lib/env'
import { createBrowserClient } from '@supabase/ssr'

export const createClient = () =>
  createBrowserClient<Database>(env.SUPABASE_URL, env.SUPABASE_ANON_KEY)
