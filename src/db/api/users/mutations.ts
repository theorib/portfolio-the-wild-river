import { db } from '@/db';
import { createDbOperation } from '@/db/dbOperationUtils';
import { type UpdateUser, UpdateUserSchema, users } from '@/db/schemas';
import { validateSession } from '@/lib/auth';
import { messageCatalog } from '@/lib/constants/messageCatalog';
import { AppError } from '@/lib/errors';
import { eq } from 'drizzle-orm';
import { fromError } from 'zod-validation-error';

export const updateCurrentUser = createDbOperation(
  async (newUserData: UpdateUser) => {
    const { user } = await validateSession();
    if (!user) throw new AppError('INVALID_SESSION');

    const parsedNewUserData =
      await UpdateUserSchema.safeParseAsync(newUserData);

    if (!parsedNewUserData.success)
      throw new AppError('ZOD_PARSING_ERROR', {
        cause: fromError(parsedNewUserData.error),
      });

    const result = await db
      .update(users)
      .set({
        ...parsedNewUserData.data,
      })
      .where(eq(users.id, user.id))
      .returning();

    const data = result.at(0);

    if (!data) throw new AppError('DATABASE_RETURNED_DATA_INVALID');

    return {
      data,
      message: messageCatalog.USER_UPDATE_SUCCESSFUL.message,
    };
  },
);
