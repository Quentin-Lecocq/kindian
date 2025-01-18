CREATE TABLE "books" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"title" varchar(255) NOT NULL,
	"author" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"highlights_count" integer DEFAULT 0,
	"comments_count" integer DEFAULT 0,
	"bookmarks_count" integer DEFAULT 0,
	"isbn13" varchar(13),
	"isbn10" varchar(10),
	"google_books_id" varchar(255),
	"image_url" varchar(255),
	"subtitle" varchar(255),
	"published_date" varchar(10),
	"page_count" integer,
	"description" text,
	"categories" text[] DEFAULT '{}'::text[] NOT NULL,
	"text_snippet" text,
	"google_books_link" varchar(255),
	CONSTRAINT "books_isbn13_unique" UNIQUE("isbn13"),
	CONSTRAINT "books_isbn10_unique" UNIQUE("isbn10"),
	CONSTRAINT "books_google_books_id_unique" UNIQUE("google_books_id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"clerk_id" varchar(255) NOT NULL,
	"name" varchar(255),
	"image" varchar(255),
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_clerk_id_unique" UNIQUE("clerk_id")
);
--> statement-breakpoint
ALTER TABLE "books" ADD CONSTRAINT "books_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;