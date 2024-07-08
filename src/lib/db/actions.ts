'use server';
import db from '@/lib/db';
import { AppError } from '@/lib/errors';
import { EmailSchema } from '@/lib/schemas';
import 'server-only';
// import { ZodError } from 'zod';
// import { fromError } from 'zod-validation-error';

export const getUserByEmail = async (email: string) => {
  try {
    const { email: validatedEmail } = EmailSchema.parse({ email });

    const user = await db.user.findUnique({
      where: {
        email: validatedEmail,
      },
    });

    if (!user) {
      throw new AppError('invalidUser');
    }
    return user;
  } catch (err) {
    console.error(err);
    return null;
  }
};
