import { db } from '@/db'
import { createDbOperation } from '@/db/dbOperationUtils'
import { users } from '@/db/schemas'
import { validateSession } from '@/lib/auth'
import { errorCatalog } from '@/lib/constants/errorCatalog'
import { messageCatalog } from '@/lib/constants/messageCatalog'
import { AppError } from '@/lib/errors'
import { eq } from 'drizzle-orm'

export const getCurrentUser = createDbOperation(async () => {
  const { user } = await validateSession()
  if (!user) throw new AppError('INVALID_SESSION')

  const rows = await db.select().from(users).where(eq(users.id, user.id))
  const data = rows.at(0)

  if (!data) throw new AppError('DATABASE_RETURNED_DATA_INVALID')

  return { data, message: messageCatalog.USER_SELECT_SUCCESSFUL.message }
})
