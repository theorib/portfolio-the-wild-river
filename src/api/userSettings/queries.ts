// 'use server';
// import { db } from '@/db';
// import { emailVerificationCodes, users } from '@/db/dbSchemas';
// import AppError from '@/lib/errors';

// import { EmailSchema } from '@/lib/zod.schemas';
// import { InsertUserSchema, SelectUserSchema } from '@/lib/zod.schemas';
// import { eq } from 'drizzle-orm';
// import 'server-only';
// import { z } from 'zod';
// import { createServerAction, ZSAError } from 'zsa';

// export const getUsers = async () => {
//   const { session } = await getUserAuth();
//   const rows = await db.select().from(clients).where(eq(clients.userId, session?.user.id!));
//   const c = rows
//   return { clients: c };
// };

// export const getUserrById = async (id: ClientId) => {
//   const { session } = await getUserAuth();
//   const { id: clientId } = clientIdSchema.parse({ id });
//   const [row] = await db.select().from(clients).where(and(eq(clients.id, clientId), eq(clients.userId, session?.user.id!)));
//   if (row === undefined) return {};
//   const c = row;
//   return { client: c };
// };
