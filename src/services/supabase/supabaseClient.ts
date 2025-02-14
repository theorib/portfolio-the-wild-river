import { env } from '@/lib/env'
import { createBrowserClient } from '@supabase/ssr'

const url = env.SUPABASE_URL
const key = env.SUPABASE_ANON_KEY
export const createClient = ({
  supabaseUrl = url,
  supabaseKey = key,
}: {
  supabaseUrl?: string
  supabaseKey?: string
}) => createBrowserClient(supabaseUrl, supabaseKey)
