import { z } from 'zod';

export const EmailSchema = z.email().toLowerCase();
export type Email = z.infer<typeof EmailSchema>;
