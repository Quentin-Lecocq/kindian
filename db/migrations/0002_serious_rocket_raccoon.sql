ALTER TABLE "books" ADD COLUMN "isbn13" varchar(13);--> statement-breakpoint
ALTER TABLE "books" ADD COLUMN "isbn10" varchar(10);--> statement-breakpoint
ALTER TABLE "books" ADD COLUMN "google_books_id" varchar(255);--> statement-breakpoint
ALTER TABLE "books" ADD COLUMN "image_url" varchar(255);--> statement-breakpoint
ALTER TABLE "books" ADD COLUMN "subtitle" varchar(255);--> statement-breakpoint
ALTER TABLE "books" ADD COLUMN "published_date" varchar(10);--> statement-breakpoint
ALTER TABLE "books" ADD COLUMN "page_count" integer;--> statement-breakpoint
ALTER TABLE "books" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "books" ADD COLUMN "categories" varchar;--> statement-breakpoint
ALTER TABLE "books" ADD COLUMN "text_snippet" text;--> statement-breakpoint
ALTER TABLE "books" ADD COLUMN "google_books_link" varchar(255);--> statement-breakpoint
ALTER TABLE "books" ADD CONSTRAINT "books_isbn13_unique" UNIQUE("isbn13");--> statement-breakpoint
ALTER TABLE "books" ADD CONSTRAINT "books_isbn10_unique" UNIQUE("isbn10");--> statement-breakpoint
ALTER TABLE "books" ADD CONSTRAINT "books_google_books_id_unique" UNIQUE("google_books_id");