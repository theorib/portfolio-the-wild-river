import { z } from 'zod'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { relations } from 'drizzle-orm'
import { UserIdSchema, users } from '@/db/schemas'
import { TOKEN_CONSTANTS } from '@/lib/auth/authHelpers'

/**
 * Drizzle Schema
 */
export const sessions = sqliteTable('sessions', {
  id: text('id').notNull().primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expiresAt: integer('expires_at').notNull(),
})

/**
 * Drizzle Relations
 */
export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}))

/**
 * Zod Schemas
 */
export const SessionTokenSchema = z
  .string()
  .length(TOKEN_CONSTANTS.STRING_LENGTH)

export const SessionIdSchema = z
  .string()
  .length(TOKEN_CONSTANTS.STRING_LENGTH * 2)

const refineSchema = { id: SessionIdSchema, userId: UserIdSchema }
const baseSchema = createSelectSchema(sessions, refineSchema)

export const SelectSessionSchema = baseSchema
export const SelectSessionClientSchema = baseSchema.omit({
  userId: true,
})

export const InsertSessionSchema = createInsertSchema(sessions, refineSchema)
export const InsertSessionClientSchema = InsertSessionSchema.pick({})

export const UpdateSessionSchema = InsertSessionSchema.partial()
export const UpdateSessionClientSchema = InsertSessionClientSchema.partial()

/**
 * Types
 */
export type Session = typeof sessions.$inferInsert
export type SelectSession = z.infer<typeof SelectSessionSchema>
export type SelectSessionClient = z.infer<typeof SelectSessionClientSchema>
export type InsertSession = z.infer<typeof InsertSessionSchema>
export type InsertSessionClient = z.infer<typeof InsertSessionClientSchema>
export type UpdateSession = z.infer<typeof UpdateSessionSchema>
export type UpdateSessionClient = z.infer<typeof UpdateSessionClientSchema>
