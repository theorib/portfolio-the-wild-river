import { UserRoleSchema } from '@/lib/zod.schemas';
import { z } from 'zod';

export type UserRole = z.infer<typeof UserRoleSchema>;
