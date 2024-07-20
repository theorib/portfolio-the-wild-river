'use server';
import { db } from '@/db';
import { emailVerificationCodes, users } from '@/db/db.schemas';
import AppError from '@/lib/errors';

import { EmailSchema } from '@/lib/zod.schemas';
import { InsertUserSchema, SelectUserSchema } from '@/lib/zod.schemas';
import { eq } from 'drizzle-orm';
import 'server-only';
import { z } from 'zod';
import { createServerAction, ZSAError } from 'zsa';

export const checkIfEmailExists = createServerAction()
  .input(EmailSchema)
  .output(z.boolean())
  .onError(error => {
    // throw error;
    // TODO Log error to server
  })
  .handler(async ({ input }) => {
    const results = await db.select().from(users).where(eq(users.email, input));

    if (results.length > 1) throw new AppError('UNKNOWN_DATABASE_ERROR');

    return results.length === 1 ? true : false;
  });

export const createUser = createServerAction()
  .input(InsertUserSchema)
  .output(SelectUserSchema)
  .onError(error => {
    // TODO Log error to server
    if (
      error instanceof ZSAError &&
      error?.message === 'UNIQUE constraint failed: user.email'
    ) {
      throw new AppError('EMAIL_IN_USE_ERROR', { cause: error });
    }
    throw new AppError('UNKNOWN_DATABASE_ERROR', { cause: error });
  })
  .handler(async ({ input }) => {
    const [user, ...unexpectedUsers] = await db
      .insert(users)
      .values({ ...input, role: 'user', emailVerified: null })
      .returning();

    if (!user || unexpectedUsers.length > 0) {
      throw new AppError('UNKNOWN_DATABASE_ERROR', {
        data: { input, user, unexpectedUsers },
      });
    }
    return user;
  });

export const getUserByEmail = createServerAction()
  .input(EmailSchema)
  .output(z.nullable(SelectUserSchema))
  .onError(error => {
    // TODO Log error to server
  })
  .handler(async ({ input }) => {
    const user = await db.query.users.findFirst({
      where: eq(users.email, input),
    });

    if (!user) return null;
    return user;
  });

export const getUserById = createServerAction()
  .input(z.string())
  .output(z.nullable(SelectUserSchema))
  .onError(error => {
    // TODO Log error to server
  })
  .handler(async ({ input }) => {
    const user = await db.query.users.findFirst({
      where: eq(users.id, input),
    });

    if (!user) return null;
    return user;
  });

export const deleteEmailVerificationCodesByUserId = createServerAction()
  .input(z.string())
  .onError(error => {
    if (!(error instanceof ZSAError)) {
      throw new AppError('UNKNOWN_ERROR');
    }
    if (error) return { error: error?.message };
    // TODO Log error to server
  })
  .handler(async ({ input }) => {
    const result = await db
      .delete(emailVerificationCodes)
      .where(eq(emailVerificationCodes.userId, input));
    if (result.changes) return { success: true };

    return { success: false };
  });
