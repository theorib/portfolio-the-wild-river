'use server';
import 'server-only';
import { lucia } from '@/lib/auth/auth';
import { cookies } from 'next/headers';
import { cache } from 'react';
import {
  UserWithoutPassword,
  UserWithoutPasswordSchema,
} from '@/lib/zod.schemas';
import { z } from 'zod';
import AppError from '@/lib/errors';
import { Session } from 'lucia';
import {
  createSessionCookie,
  invalidateSessionCookie,
} from '@/lib/auth/auth.actions/authCookies.actions';

export async function setSession(userId: string) {
  const session = await lucia.createSession(userId, {});
  await createSessionCookie(session.id);
}

type ValidateSessionResult = Promise<
  | { user: UserWithoutPassword; session: Session }
  | { user: null; session: null }
>;

export const validateSession = cache(async (): ValidateSessionResult => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) {
    await invalidateSessionCookie();
    return { user: null, session: null };
  }

  const { user, session } = await lucia.validateSession(sessionId);

  if (session && session.fresh) await createSessionCookie(session.id);
  if (!session) await invalidateSessionCookie();

  const parseUserResult = z.optional(UserWithoutPasswordSchema).safeParse(user);

  if (!user || !session || !parseUserResult.success || !parseUserResult.data)
    return { user: null, session: null };

  return { user: parseUserResult.data, session };
});

export const getCurrentUser = cache(async () => {
  const { user } = await validateSession();
  if (!user) throw new AppError('INVALID_USER');
  return user;
});
