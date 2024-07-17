import { z } from 'zod';

export const UserIdSchema = z.string();

export const LoginFormSchema = z.object({
  email: z.string().email({}),
  password: z.string().min(1, { message: 'Password is required' }),
});

export const RegisterFormSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: 'Name must contain at least 3 characters ling' })
      .max(100, { message: `Name can't be longer than 100 characters` }),
    email: z.string().email({}),
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
