ALTER TABLE "books" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "books" ALTER COLUMN "title" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "books" ALTER COLUMN "author" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "books" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "books" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "books" ALTER COLUMN "highlights_count" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "books" ALTER COLUMN "comments_count" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "books" ALTER COLUMN "bookmarks_count" SET NOT NULL;