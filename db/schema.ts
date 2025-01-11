import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const UsersTable = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }),
  image: varchar('image', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow(),
});

export type InsertUser = typeof UsersTable.$inferInsert;
export type SelectUser = typeof UsersTable.$inferSelect;
