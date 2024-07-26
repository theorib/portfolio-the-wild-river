import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { resolve } from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
// import { env } from '@/lib/env';
import * as dotenv from 'dotenv';
dotenv.config();

const runMigration = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const migrationClient = new Database(process.env.DATABASE_URL);
  const migrationDb = drizzle(migrationClient);

  console.log('⏳ Running migrations...');
  const start = Date.now();
  await migrate(migrationDb, {
    migrationsFolder: resolve(__dirname, '../migrations'),
  });

  const end = Date.now();
  console.log('✅ Migrations completed in', end - start, 'ms');
  process.exit(0);
};

runMigration().catch(err => {
  console.error('❌ Migration failed');
  console.error(err);
  process.exit(1);
});
