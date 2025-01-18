import TypographyH4 from '@/components/typography/typography-h4';
import TypographySmall from '@/components/typography/typography-small';
import { Button } from '@/components/ui/button';
import { InsertBook } from '@/db/schema';
import Image from 'next/image';

type BookDetailsProps = {
  book: InsertBook;
};

const BookDetails = ({ book }: BookDetailsProps) => {
  const {
    imageUrl,
    title,
    author,
    bookmarksCount,
    commentsCount,
    highlightsCount,
    publishedDate,
    pageCount,
    isbn13,
    isbn10,
    categories,
    textSnippet,
    description,
    googleBooksLink,
  } = book;

  console.log({ categories });

  return (
    <div className="">
      <div className="flex gap-4">
        <div className="">
          <Image
            src={imageUrl || ''}
            alt={title}
            width={124}
            height={124}
            className="rounded-md"
          />
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h4 className="text-xl font-semibold tracking-tight scroll-m-20 text-foreground">
              {title}
            </h4>
            <p className="text-sm text-muted-foreground">by {author}</p>
            <div className="flex gap-2 text-sm text-muted-foreground">
              <span>{bookmarksCount} bookmarks</span>
              {'-'}
              <span>{commentsCount} comments</span>
              {'-'}
              <span>{highlightsCount} highlights</span>
            </div>
            <div className="flex gap-2 text-sm text-muted-foreground">
              <span>Published : {publishedDate}</span>
              {'-'}
              <span>Pages : {pageCount}</span>
            </div>
            <div className="flex gap-2 text-sm text-muted-foreground">
              <span>ISBN13 : {isbn13}</span>
              {'-'}
              <span>ISBN10 : {isbn10}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Categories : {categories}
            </p>
          </div>
          {googleBooksLink && (
            <Button variant="link" className="p-0 self-start">
              <a href={googleBooksLink}>
                <TypographySmall>Read on Google Books</TypographySmall>
              </a>
            </Button>
          )}
        </div>
      </div>
      <div className="mt-6">
        <div className="mb-6">
          <TypographyH4>Summary</TypographyH4>
          <p className="text-sm text-foreground">{textSnippet}</p>
        </div>
        <div>
          <TypographyH4>Description</TypographyH4>
          <p className="text-sm text-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
