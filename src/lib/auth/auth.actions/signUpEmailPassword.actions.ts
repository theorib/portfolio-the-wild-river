'use server';
import 'server-only';
import { RegisterFormSchema } from '@/lib/zod.schemas';
import { createServerAction, ZSAError } from 'zsa';
import { hash } from '@node-rs/argon2';

import AppError from '@/lib/errors';
import { hashInput } from '@/lib/auth/auth.actions/authHelpers.actions';
import { createUser } from '@/db/db.actions';
import { setSession } from '@/lib/auth/auth.actions/authSession.actions';

export const signUpEmailPassword = createServerAction()
  .input(RegisterFormSchema)
  .onError(error => {
    // TODO Log error to server
  })
  .handler(async ({ input }) => {
    const passwordHash = await hashInput(input.password);
    const [user] = await createUser({ ...input, passwordHash });

    if (!user) throw new AppError('INVALID_USER');

    await setSession(user.id);

    return user;
  });
