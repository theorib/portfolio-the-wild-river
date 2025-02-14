import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'production']),
    DATABASE_URL: z.string().min(1),
    SUPABASE_ANON_KEY: z.string().min(100),
    SUPABASE_URL: z.string().min(1).url(),
    SUPABASE_PROJECT_ID: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_DOMAIN: z.string(),
    NEXT_PUBLIC_AUTH_SESSION_COOKIE_NAME: z.string().min(4),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN,
    NEXT_PUBLIC_AUTH_SESSION_COOKIE_NAME:
      process.env.NEXT_PUBLIC_AUTH_SESSION_COOKIE_NAME,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_PROJECT_ID: process.env.SUPABASE_PROJECT_ID,
  },
})
