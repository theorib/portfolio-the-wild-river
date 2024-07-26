import { z } from 'zod';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { relations, sql } from 'drizzle-orm';
import { typeid } from 'typeid-js';
import { UserIdSchema, users } from '@/db/schemas';
import { isTypeID, timestamps } from '@/lib/utils';

/**
 * Drizzle Schema
 */
const idPrefix = 'user_setting_id';

export const userSettings = sqliteTable('user_settings', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => typeid(idPrefix).toString()),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  sideBarToggle: integer('side_bar_toggle', { mode: 'boolean' })
    .notNull()
    .default(false),
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
export const userSettingsRelations = relations(userSettings, ({ one }) => ({
  user: one(users, {
    fields: [userSettings.userId],
    references: [users.id],
  }),
}));

/**
 * Zod Schemas
 */
export const UserSettingsIdSchema = z
  .string()
  .refine(str => isTypeID(str, idPrefix));

const refineSchema = {
  id: UserSettingsIdSchema,
  userId: UserIdSchema,
};
const baseSchema = createSelectSchema(userSettings, refineSchema);

export const SelectUserSettingsSchema = baseSchema;
export const SelectUserSettingsClientSchema = baseSchema.omit({
  userId: true,
  ...timestamps,
});

export const InsertUserSettingsSchema = createInsertSchema(
  userSettings,
  refineSchema,
).omit({ ...timestamps });
export const InsertUserSettingsClientSchema = InsertUserSettingsSchema;

export const UpdateUserSettingsSchema = InsertUserSettingsSchema.omit({
  id: true,
}).partial();
export const UpdateUserSettingsClientSchema = UpdateUserSettingsSchema;

/**
 * Types
 */
export type UserSettings = typeof userSettings.$inferInsert;
export type SelectUserSettings = z.infer<typeof SelectUserSettingsSchema>;
export type SelectUserSettingsClient = z.infer<
  typeof SelectUserSettingsClientSchema
>;
export type InsertUserSettings = z.infer<typeof InsertUserSettingsSchema>;
export type InsertUserSettingsClient = z.infer<
  typeof InsertUserSettingsClientSchema
>;
export type UpdateUserSettings = z.infer<typeof UpdateUserSettingsSchema>;
export type UpdateUserSettingsClient = z.infer<
  typeof UpdateUserSettingsClientSchema
>;
