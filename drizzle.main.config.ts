import type { Config } from 'drizzle-kit';
import { defineConfig } from 'drizzle-kit';
import { env } from '@/lib/env';
// import * as dotenv from 'dotenv';
// dotenv.config();

export default defineConfig({
  dialect: 'sqlite',
  schema: './src/db/db.schemas/index.ts',
  out: './src/db/migrations',

  dbCredentials: {
    url: env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
}) satisfies Config;
