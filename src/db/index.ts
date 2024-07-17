import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from '@/db/db.schemas';
import { env } from '@/lib/env';

const sqlite = new Database(env.DATABASE_URL);
sqlite.pragma('journal_mode = WAL');

const db = drizzle(sqlite, {
  // logger: true,
  schema,
});

export default db;
