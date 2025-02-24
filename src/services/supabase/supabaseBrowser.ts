import { type Database } from '@/services/supabase/supabase.auto.types'
import { type TypedSupabaseClient } from '@/services/supabase/supabase.types'
import { env } from '@/shared/lib/env'
import { createBrowserClient } from '@supabase/ssr'
import { useMemo } from 'react'

export const createClient = () =>
  createBrowserClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  )

let client: TypedSupabaseClient | undefined

function getSupabaseBrowserClient() {
  if (client) {
    return client
  }

  client = createClient()

  return client
}

function useSupabaseBrowser() {
  return useMemo(getSupabaseBrowserClient, [])
}

export default useSupabaseBrowser
