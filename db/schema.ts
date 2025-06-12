import { createId } from '@paralleldrive/cuid2'
import { sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { createSelectSchema } from 'drizzle-zod'

export const habitTable = sqliteTable('habits', {
  id: text('id')
    .$defaultFn(() => createId())
    .notNull(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  category: text('category').notNull(),
  duration: integer('duration').notNull(),
  archived: integer('archived', {
    mode: 'boolean',
  }).default(false),
  enableNotifications: integer('enable_notifications', {
    mode: 'boolean',
  }).default(false),
  createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`),
})

export const HabitSchema = createSelectSchema(habitTable)
export type Habit = ReturnType<(typeof HabitSchema)['parse']>
