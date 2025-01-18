import {
  index,
  integer,
  pgTable,
  text,
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
    userId: uuid('user_id')
      .references(() => UsersTable.id)
      .notNull(),
    title: varchar('title', { length: 255 }).notNull(),
    author: varchar('author', { length: 255 }).notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
    highlightsCount: integer('highlights_count').default(0),
    commentsCount: integer('comments_count').default(0),
    bookmarksCount: integer('bookmarks_count').default(0),
    isbn13: varchar('isbn13', { length: 13 }).unique(),
    isbn10: varchar('isbn10', { length: 10 }).unique(),
    googleBooksId: varchar('google_books_id', { length: 255 }).unique(),
    imageUrl: varchar('image_url', { length: 255 }),
    subtitle: varchar('subtitle', { length: 255 }),
    publishedDate: varchar('published_date', { length: 10 }),
    pageCount: integer('page_count'),
    description: text('description'),
    categories: varchar('categories'),
    textSnippet: text('text_snippet'),
    googleBooksLink: varchar('google_books_link', { length: 255 }),
  },
  (books) => [
    {
      userIdx: index('user_idx').on(books.userId),
    },
  ]
);

export type InsertBook = typeof BooksTable.$inferInsert;
export type SelectBook = typeof BooksTable.$inferSelect;
