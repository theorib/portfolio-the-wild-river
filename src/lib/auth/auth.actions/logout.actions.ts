'use server';
import 'server-only';
import { invalidateSessionCookie } from '@/lib/auth/auth.actions/authCookies.actions';
import { validateSession } from '@/lib/auth/auth.actions/authSession.actions';
import { lucia } from '@/lib/auth/auth';
import AppError from '@/lib/errors';

export const logout = async () => {
  const { session } = await validateSession();
  if (!session) throw new AppError('INVALID_SESSION');

  await lucia.invalidateSession(session.id);
  await invalidateSessionCookie();
  // return redirect(paths.login());
};
