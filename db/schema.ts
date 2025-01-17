import {
  index,
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const UsersTable = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  clerkId: varchar('clerk_id', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }),
  image: varchar('image', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow(),
});

export type InsertUser = typeof UsersTable.$inferInsert;
export type SelectUser = typeof UsersTable.$inferSelect;

export const BooksTable = pgTable(
  'books',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').references(() => UsersTable.id),
    title: varchar('title', { length: 255 }),
    author: varchar('author', { length: 255 }),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
    highlightsCount: integer('highlights_count').default(0),
    commentsCount: integer('comments_count').default(0),
    bookmarksCount: integer('bookmarks_count').default(0),
  },
  (books) => [
    {
      userIdx: index('user_idx').on(books.userId),
    },
  ]
);

export type InsertBook = typeof BooksTable.$inferInsert;
export type SelectBook = typeof BooksTable.$inferSelect;
