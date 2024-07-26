'use server';
import 'server-only';
import { cache } from 'react';
import { z } from 'zod';
import { Argon2id } from 'oslo/password';
import { Cookie } from 'lucia';
import { cookies } from 'next/headers';
import { lucia } from '@/lib/auth/lucia';
import { SelectUserAuthSchema } from '@/db/dbSchemas';
import { redirect } from 'next/navigation';
import paths from '@/lib/constants/paths';
import AppError from '@/lib/errors';
import { ValidateSession } from '@/lib/auth/authZodSchemas';

const argon2id = new Argon2id();

export async function hashInput(input: string) {
  const hashedInput = await argon2id.hash(input);
  return hashedInput;
}

export async function verifyInputAgainstHash(input: string, hash: string) {
  const isInputCorrect = await argon2id.verify(hash, input);

  return isInputCorrect;
}

export async function setCookie(cookie: Cookie) {
  try {
    cookies().set(cookie.name, cookie.value, cookie.attributes);
  } catch (error) {
    // Next.js throws an error when attempting to set cookies when rendering page
  }
}

export async function createSessionCookie(sessionId: string) {
  const sessionCookie = lucia.createSessionCookie(sessionId);
  await setCookie(sessionCookie);
}

export async function invalidateSessionCookie() {
  const sessionCookie = lucia.createBlankSessionCookie();
  await setCookie(sessionCookie);
}

export async function setSession(userId: string) {
  const session = await lucia.createSession(userId, {});
  await createSessionCookie(session.id);
}

export const validateSession = cache(async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) {
    await invalidateSessionCookie();
    return { user: null, session: null };
  }

  const { user, session } = await lucia.validateSession(sessionId);

  if (session && session.fresh) await createSessionCookie(session.id);
  if (!session) await invalidateSessionCookie();

  const parseUserResult = z.optional(SelectUserAuthSchema).safeParse(user);
  if (!parseUserResult.success) {
    throw new AppError('ZOD_PARSING_ERROR', { cause: parseUserResult.error });
  }

  if (!user || !session || !parseUserResult.success) {
    return { user: null, session: null };
  }

  return { user: parseUserResult.data, session };
});

export const logout = async () => {
  const { session } = await validateSession();
  if (!session) throw new AppError('INVALID_SESSION');

  await lucia.invalidateSession(session.id);
  await invalidateSessionCookie();
  return redirect(paths.login.pathname);
};
