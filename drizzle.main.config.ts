import { type Config } from 'drizzle-kit'
import { defineConfig } from 'drizzle-kit'
import { env } from '@/shared/lib/env'
// import * as dotenv from 'dotenv';
// dotenv.config();

export default defineConfig({
  dialect: 'sqlite',
  schema: './src/db/dbSchemas/index.ts',
  out: './src/db/migrations',

  dbCredentials: {
    url: env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
}) satisfies Config
