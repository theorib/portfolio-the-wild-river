'use server';
import 'server-only';

import { redirect } from 'next/navigation';
import { z } from 'zod';

import { createServerAction } from 'zsa';

import {
  hashInput,
  setSession,
  verifyInputAgainstHash,
} from '@/lib/auth/authHelpers';
import { LoginFormSchema, RegisterFormSchema } from '@/lib/auth/authZodSchemas';

import paths from '@/lib/constants/paths';
import { AppError } from '@/lib/errors';

import { db } from '@/db';
import { SelectUserClientSchema, users } from '@/db/schemas';
import { eq } from 'drizzle-orm';

export const registerUserAction = createServerAction()
  .input(RegisterFormSchema)
  .onError(error => {
    // TODO Log error to server
  })
  .handler(async ({ input }) => {
    const passwordHash = await hashInput(input.password);
    const [user] = await db
      .insert(users)
      .values({
        name: input.name,
        email: input.email,
        passwordHash,
      })
      .returning();

    if (!user) throw new AppError('INVALID_USER');

    await setSession(user.id);

    const clientUser = SelectUserClientSchema.parse(user);
    return clientUser;
  });

export const loginUserAction = createServerAction()
  .input(LoginFormSchema)
  .output(z.void())
  .onError(error => {
    // TODO Log error to server
  })
  .handler(async ({ input }) => {
    const user = await db.query.users.findFirst({
      where: eq(users.email, input.email),
    });

    if (!user || !user?.passwordHash) throw new AppError('LOGIN_ERROR');

    const isPasswordValid = await verifyInputAgainstHash(
      input.password,
      user.passwordHash,
    );

    if (!isPasswordValid) throw new AppError('LOGIN_ERROR');

    await setSession(user.id);

    return redirect(paths.dashboard.pathname);
  });

// export const checkIfEmailExists = createServerAction()
//   .input(EmailSchema)
//   .output(z.boolean())
//   .onError(error => {
//     // throw error;
//     // TODO Log error to server
//   })
//   .handler(async ({ input }) => {
//     const results = await db.select().from(users).where(eq(users.email, input));

//     if (results.length > 1) throw new AppError('DATABASE_UNKNOWN_ERROR');

//     return results.length === 1 ? true : false;
//   });

// export const generateEmailVerificationCode = async function (
//   userId: string,
//   email: string,
// ): Promise<string> {
//   await deleteEmailVerificationCodesByUserId(userId);
//   return '';
// };
