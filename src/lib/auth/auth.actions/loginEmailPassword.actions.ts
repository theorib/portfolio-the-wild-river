'use server';
import 'server-only';
import { LoginFormSchema } from '@/lib/zod.schemas';
import { createServerAction } from 'zsa';

import AppError from '@/lib/errors';
import { z } from 'zod';

import { log } from 'console';
import { getUserByEmail } from '@/db/db.actions';
import { verifyPasswordAgainstHash } from '@/lib/auth/auth.actions/authHelpers.actions';
import { setSession } from '@/lib/auth/auth.actions/authSession.actions';

export const loginEmailPassword = createServerAction()
  .input(LoginFormSchema)
  .output(z.void())
  .onError(error => {
    // TODO Log error to server
  })
  .handler(async ({ input }) => {
    const [user] = await getUserByEmail(input.email);
    if (!user || !user?.passwordHash) throw new AppError('LOGIN_ERROR');

    const isPasswordValid = await verifyPasswordAgainstHash(
      input.password,
      user.passwordHash,
    );

    if (!isPasswordValid) throw new AppError('LOGIN_ERROR');

    await setSession(user.id);

    return;
  });
