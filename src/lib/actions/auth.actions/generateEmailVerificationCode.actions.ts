'use server';
import { deleteEmailVerificationCodesByUserId } from '@/lib/actions/db.actions';
import 'server-only';

export const generateEmailVerificationCode = async function (
  userId: string,
  email: string,
): Promise<string> {
  await deleteEmailVerificationCodesByUserId(userId);
  return '';
};
