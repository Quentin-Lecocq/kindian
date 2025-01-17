ALTER TABLE "books" ALTER COLUMN "created_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "books" ALTER COLUMN "updated_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "books" ALTER COLUMN "highlights_count" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "books" ALTER COLUMN "comments_count" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "books" ALTER COLUMN "bookmarks_count" DROP NOT NULL;