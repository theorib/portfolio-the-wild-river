import { z } from 'zod';
import { EmailSchema } from '@/lib/zodSchemas/otherZodSchemas';
import { SelectUserAuthSchema, UserIdSchema } from '@/db/schemas';

export const SessionSchema = z.object({
  id: UserIdSchema,
  expiresAt: z.date(),
  fresh: z.boolean(),
  userId: UserIdSchema,
});

export const ValidateSessionSchema = z.union([
  z.object({
    user: SelectUserAuthSchema,
    session: SessionSchema,
  }),
  z.object({
    user: z.null(),
    session: z.null(),
  }),
]);
export type ValidateSession = z.infer<typeof ValidateSessionSchema>;

export const LoginFormSchema = z.object({
  email: EmailSchema,
  password: z.string().min(1, { message: 'Password is required' }),
});

export const RegisterFormSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: 'Name must contain at least 3 characters ling' })
      .max(100, { message: `Name can't be longer than 100 characters` }),
    email: EmailSchema,
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' })
      .max(120, { message: `Password can't be longer than 120 characters` }),
    confirmPassword: z.string(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      });
    }
  });
