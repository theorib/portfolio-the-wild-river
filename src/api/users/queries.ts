import { db } from '@/db';
import { users } from '@/db/dbSchemas';
import { validateSession } from '@/lib/auth';
import { errorCatalog } from '@/lib/constants/errorCatalog';
import { eq } from 'drizzle-orm';

export const getCurrentUser = async () => {
  const { user } = await validateSession();
  if (!user)
    return {
      error: errorCatalog.INVALID_SESSION.message,
    };
  const rows = await db.select().from(users).where(eq(users.id, user.id));
  const data = rows.at(0);
  if (!data) return { error: errorCatalog.DATABASE_SELECT_ERROR.message };
  return { data };
};
