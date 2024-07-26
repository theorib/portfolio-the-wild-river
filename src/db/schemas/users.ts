import { z } from 'zod';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { relations, sql } from 'drizzle-orm';
import { sessions, userSettings, emailVerificationCodes } from '@/db/schemas';
import { typeid } from 'typeid-js';

import { EmailSchema } from '@/lib/zodSchemas/otherZodSchemas';
import { isTypeID, timestamps } from '@/lib/utils';

/**
 * Drizzle Schema
 */
const idPrefix = 'user_id';

export const users = sqliteTable('users', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => typeid(idPrefix).toString()),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: integer('emailVerified', { mode: 'timestamp_ms' }).default(
    sql`null`,
  ),
  passwordHash: text('password_hash'),
  image: text('image'),
  role: text('role').notNull().$type<UserRole>().default('user'),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`)
    .$onUpdate(() => sql`(unixepoch())`),
});

/**
 * Drizzle Relations
 */
export const usersRelations = relations(users, ({ many, one }) => ({
  sessions: many(sessions),
  emailVerificationCodes: many(emailVerificationCodes),
  userSettings: one(userSettings),
}));

/**
 * Zod Schemas
 */
export const UserIdSchema = z.string().refine(str => isTypeID(str, idPrefix));
export const UserRoleSchema = z.enum(['superAdmin', 'admin', 'user']);
const refineSchema = {
  id: UserIdSchema,
  role: UserRoleSchema,
  email: EmailSchema,
};

const baseSchema = createSelectSchema(users, refineSchema);

export const SelectUserSchema = baseSchema;
export const SelectUserAuthSchema = SelectUserSchema.omit({
  passwordHash: true,
  ...timestamps,
});
export const SelectUserClientSchema = baseSchema.omit({
  id: true,
  passwordHash: true,
  ...timestamps,
});

export const InsertUserSchema = createInsertSchema(users, refineSchema).omit({
  id: true,
  ...timestamps,
});
export const InsertUserClientSchema = InsertUserSchema.omit({
  emailVerified: true,
  passwordHash: true,
  role: true,
});

export const UpdateUserSchema = InsertUserSchema.partial();
export const UpdateUserClientSchema = InsertUserClientSchema.partial();

/**
 * Types
 */
export type User = typeof users.$inferInsert;
export type UserRole = z.infer<typeof UserRoleSchema>;
export type SelectUser = z.infer<typeof SelectUserSchema>;
export type SelectUserAuth = z.infer<typeof SelectUserAuthSchema>;
export type SelectUserClient = z.infer<typeof SelectUserClientSchema>;
export type InsertUser = z.infer<typeof InsertUserSchema>;
export type InsertUserClient = z.infer<typeof InsertUserClientSchema>;
export type UpdateUser = z.infer<typeof UpdateUserSchema>;
export type UpdateUserClient = z.infer<typeof UpdateUserClientSchema>;
