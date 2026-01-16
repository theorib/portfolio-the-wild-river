import type { Tables } from '@/services/supabase/supabase.auto.types';
import type { User } from '@supabase/supabase-js';
import * as z from 'zod';

export const LoginFormDataSchema = z.object({
	email: z.email(),
	password: z.string().min(8, { error: 'Invalid password' }),
});
export type LoginFormData = z.output<typeof LoginFormDataSchema>;

export const LoginDataSchema = LoginFormDataSchema;
export type LoginDataInput = z.input<typeof LoginDataSchema>;
export type LoginData = z.output<typeof LoginDataSchema>;

export type UserMetadata = Tables<'users_metadata'>;

export interface UserWithMetadata extends User {
	userMetadata: UserMetadata | null;
}
