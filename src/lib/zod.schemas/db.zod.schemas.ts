import { z } from 'zod';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { users } from '@/db/db.schemas';

/**
 * users
 */
export const UserRoleSchema = z.enum(['superAdmin', 'admin', 'user']);
export type UserRole = z.infer<typeof UserRoleSchema>;

export const InsertUserSchema = createInsertSchema(users, {
  role: UserRoleSchema,
});
export const SelectUserSchema = createSelectSchema(users, {
  role: UserRoleSchema,
});

export type InsertUser = z.infer<typeof InsertUserSchema>;
export type SelectUser = z.infer<typeof SelectUserSchema>;

// create a schema based on the selectUserSchema that doesn't have the passwordHash property
export const UserBasicInfoSchema = SelectUserSchema.pick({
  id: true,
  name: true,
  email: true,
  emailVerified: true,
  image: true,
  role: true,
});

export type UserBasicInfo = z.infer<typeof UserBasicInfoSchema>;

export const UserWithoutPasswordSchema = SelectUserSchema.omit({
  passwordHash: true,
});

export type UserWithoutPassword = z.infer<typeof UserWithoutPasswordSchema>;
