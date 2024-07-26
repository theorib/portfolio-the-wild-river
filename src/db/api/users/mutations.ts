import { db } from '@/db';
import {
  SelectUser,
  SelectUserSchema,
  UpdateUser,
  UpdateUserSchema,
  users,
} from '@/db/schemas';
import { validateSession } from '@/lib/auth';
import { errorCatalog } from '@/lib/constants/errorCatalog';
import { eq } from 'drizzle-orm';

export const updateCurrentUser = async (newUserData: UpdateUser) => {
  const { user } = await validateSession();
  if (!user)
    return {
      error: errorCatalog.INVALID_SESSION.message,
    };
  const parsedResult = await UpdateUserSchema.safeParseAsync(newUserData);

  if (!parsedResult.success) {
    {
      //TODO Log error
      return { error: errorCatalog.DATABASE_UPDATE_ERROR.message };
    }
  }

  try {
    const data = await db
      .update(users)
      .set({
        ...parsedResult.data,
      })
      .where(eq(users.id, user.id))
      .returning();

    if (!data.at(0))
      throw new Error(
        `expected data of type ${JSON.stringify(SelectUserSchema)} but received ${JSON.stringify(data)}`,
      );
    return {
      data: data?.at(0),
    };
  } catch (error) {
    //TODO Log error
    return { error: errorCatalog.DATABASE_UPDATE_ERROR.message };
  }

  // const { session } = await getUserAuth();
  // const { id: clientId } = clientIdSchema.parse({ id });
  // const newClient = updateClientSchema.parse({
  //   ...client,
  //   userId: session?.user.id!,
  // });
  // try {
  //   const [c] = await db
  //     .update(clients)
  //     .set({
  //       ...newClient,
  //       updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
  //     })
  //     .where(
  //       and(eq(clients.id, clientId!), eq(clients.userId, session?.user.id!)),
  //     )
  //     .returning();
  //   return { client: c };
  // } catch (err) {
  //   const message = (err as Error).message ?? 'Error, please try again';
  //   console.error(message);
  //   throw { error: message };
  // }
};
