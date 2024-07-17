import { createEnv } from '@t3-oss/env-nextjs';
import { min } from 'drizzle-orm';
import { z } from 'zod';

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'production']),
    DATABASE_URL: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_AUTH_SESSION_COOKIE_NAME: z.string().min(4),
    NEXT_PUBLIC_DOMAIN: z.string(),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN,
    NEXT_PUBLIC_AUTH_SESSION_COOKIE_NAME:
      process.env.NEXT_PUBLIC_AUTH_SESSION_COOKIE_NAME,
  },
});
