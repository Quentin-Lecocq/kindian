import { cleanKindleTitle } from '../utils/format-title';

export const fetchGoogleBookInfo = async (title: string, author: string) => {
  try {
    const cleanedTitle = cleanKindleTitle(title);
    const query = encodeURIComponent(
      `intitle:${cleanedTitle}+inauthor:${author}`
    );
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${process.env.GOOGLE_BOOKS_API_KEY}`
    );
    const data = await response.json();

    if (!data.items?.length) return null;

    // TODO: fix this any
    const officialBook = data.items?.find((book: any) => {
      const info = book.volumeInfo;
      return (
        !info.subtitle?.toLowerCase().includes('summary') &&
        !info.description?.toLowerCase().includes('summary of') &&
        info.pageCount > 100 //
      );
    });
    const volumeInfo = officialBook?.volumeInfo;

    return {
      isbn13: volumeInfo.industryIdentifiers?.find(
        ({ type }: { type: string }) => type === 'ISBN_13'
      )?.identifier,
      isbn10: volumeInfo.industryIdentifiers?.find(
        ({ type }: { type: string }) => type === 'ISBN_10'
      )?.identifier,
      googleBooksId: officialBook?.id,
      imageUrl: volumeInfo.imageLinks?.thumbnail,
      subtitle: volumeInfo.subtitle,
      publishedDate: volumeInfo.publishedDate,
      pageCount: volumeInfo.pageCount,
      description: volumeInfo.description,
      categories: volumeInfo.categories,
      textSnippet: officialBook?.searchInfo?.textSnippet,
      title: volumeInfo.title,
      author: volumeInfo.authors,
      googleBooksLink: volumeInfo.previewLink,
    };
  } catch (error) {
    console.error('Error fetching Google Books info', error);
    return null;
  }
};
