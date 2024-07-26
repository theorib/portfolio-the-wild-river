import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from '@/db/schemas';
import { env } from '@/lib/env';

const sqlite = new Database(env.DATABASE_URL);
sqlite.pragma('journal_mode = WAL');

export const db = drizzle(sqlite, {
  // logger: true,
  schema,
});
