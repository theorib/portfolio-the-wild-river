'use server';
import { invalidateSessionCookie } from '@/lib/actions/auth.actions/authCookies.actions';
import { validateSession } from '@/lib/actions/auth.actions/authSession.actions';
import { lucia } from '@/lib/auth';
import AppError from '@/lib/errors';
import paths from '@/lib/paths';
import { redirect } from 'next/navigation';
import 'server-only';
import { toast } from 'sonner';

export const logout = async () => {
  const { session } = await validateSession();
  if (!session) throw new AppError('INVALID_SESSION');

  await lucia.invalidateSession(session.id);
  await invalidateSessionCookie();
  // return redirect(paths.login());
};
