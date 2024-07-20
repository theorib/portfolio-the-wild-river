import { UserRole } from '@/lib/zod.schemas';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { typeid } from 'typeid-js';
import { relations } from 'drizzle-orm';
import { users } from '@/db/db.schemas';

export const userSettings = sqliteTable('user_state', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => typeid('user_state').toString()),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  sideBarToggle: integer('side_bar_toggle', { mode: 'boolean' })
    .notNull()
    .default(false),
});

export const userSettingsRelations = relations(userSettings, ({ one }) => ({
  user: one(users, {
    fields: [userSettings.userId],
    references: [users.id],
  }),
}));
