import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const jobs = pgTable('jobs', {
  id: uuid('id').primaryKey().defaultRandom(),
  clerk_id: text('clerk_id').notNull(),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
  position: text('position').notNull(),
  company: text('company').notNull(),
  location: text('location').notNull(),
  status: text('status').notNull(),
  mode: text('mode').notNull(),
});
