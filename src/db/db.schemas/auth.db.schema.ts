// import { relations } from 'drizzle-orm';
import { UserRole } from '@/lib/zod.schemas';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { typeid } from 'typeid-js';
import { relations } from 'drizzle-orm';
import { userSettings } from '@/db/db.schemas';
/**
 * users
 */
export const users = sqliteTable('user', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => typeid('user_id').toString()),
  // username: text('username').notNull().unique(),
  name: text('name'),
  email: text('email').notNull().unique(),
  emailVerified: integer('emailVerified', { mode: 'timestamp_ms' }),
  passwordHash: text('password_hash'),
  image: text('image'),
  role: text('role').notNull().$type<UserRole>().default('user'),
});

export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
  emailVerificationCodes: many(emailVerificationCodes),
  userSettings: many(userSettings),
}));

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export const sessions = sqliteTable('session', {
  id: text('id').notNull().primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expiresAt: integer('expires_at').notNull(),
});

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export type InsertSession = typeof sessions.$inferInsert;
export type SelectSession = typeof sessions.$inferSelect;

export const emailVerificationCodes = sqliteTable('email_verification_code', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => typeid('email_verification_code_id').toString()),
  code: text('code').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  email: text('email').notNull(),
  expiresAt: integer('expires_at').notNull(),
});

export const emailVerificationCodesRelations = relations(
  emailVerificationCodes,
  ({ one }) => ({
    user: one(users, {
      fields: [emailVerificationCodes.userId],
      references: [users.id],
    }),
  }),
);

export type InsertEmailVerificationCode =
  typeof emailVerificationCodes.$inferInsert;
export type SelectEmailVerificationCode =
  typeof emailVerificationCodes.$inferSelect;
