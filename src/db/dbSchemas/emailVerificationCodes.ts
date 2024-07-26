import { z } from 'zod';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { typeid } from 'typeid-js';
import { relations, sql } from 'drizzle-orm';
import { UserIdSchema, users } from '@/db/dbSchemas';
import { EmailSchema } from '@/lib/zod.schemas/otherZodSchemas';
import { isTypeID } from '@/lib/utils';

/**
 * Drizzle Schema
 */
const idPrefix = 'email_veri_code_id';
export const emailVerificationCodes = sqliteTable('verification_codes', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => typeid(idPrefix).toString()),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  code: text('code').notNull(),
  email: text('email').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
  expiresAt: integer('expires_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
});

/**
 * Drizzle Relations
 */
export const emailVerificationCodesRelations = relations(
  emailVerificationCodes,
  ({ one }) => ({
    user: one(users, {
      fields: [emailVerificationCodes.userId],
      references: [users.id],
    }),
  }),
);

/**
 * Zod Schemas
 */
export const EmailVerificationCodeIdSchema = z
  .string()
  .refine(str => isTypeID(str, idPrefix));
const VerificationCodeSchema = z.string().length(6);
const refineSchema = {
  id: EmailVerificationCodeIdSchema,
  userId: UserIdSchema,
  email: EmailSchema,
  code: VerificationCodeSchema,
};
const baseSchema = createSelectSchema(emailVerificationCodes, refineSchema);

export const SelectVerificationCodeSchema = baseSchema;
export const SelectEmailVerificationCodeClientSchema = baseSchema.omit({
  id: true,
  createdAt: true,
});

export const InsertEmailVerificationCodeSchema = createInsertSchema(
  emailVerificationCodes,
  refineSchema,
).omit({
  id: true,
  createdAt: true,
});
export const InsertEmailVerificationCodeClientSchema =
  InsertEmailVerificationCodeSchema;

export const UpdateEmailVerificationCodeSchema =
  InsertEmailVerificationCodeSchema.omit({}).partial();
export const UpdateEmailVerificationCodeClientSchema =
  UpdateEmailVerificationCodeSchema;

/**
 * Types
 */
export type EmailVerificationCode = typeof emailVerificationCodes.$inferInsert;
export type SelectEmailVerificationCode = z.infer<
  typeof SelectVerificationCodeSchema
>;
export type SelectEmailVerificationCodeClient = z.infer<
  typeof SelectEmailVerificationCodeClientSchema
>;
export type InsertEmailVerificationCode = z.infer<
  typeof InsertEmailVerificationCodeSchema
>;
export type InsertEmailVerificationCodeClient = z.infer<
  typeof InsertEmailVerificationCodeClientSchema
>;
export type UpdateEmailVerificationCode = z.infer<
  typeof UpdateEmailVerificationCodeSchema
>;
export type UpdateEmailVerificationCodeClient = z.infer<
  typeof UpdateEmailVerificationCodeClientSchema
>;
