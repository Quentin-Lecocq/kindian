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

    const book = data.items[0];
    const volumeInfo = book.volumeInfo;

    return {
      isbn13: volumeInfo.industryIdentifiers?.find(
        ({ type }: { type: string }) => type === 'ISBN_13'
      )?.identifier,
      isbn10: volumeInfo.industryIdentifiers?.find(
        ({ type }: { type: string }) => type === 'ISBN_10'
      )?.identifier,
      googleBooksId: book.id,
      imageUrl: volumeInfo.imageLinks?.thumbnail,
      subtitle: volumeInfo.subtitle,
      publishedDate: volumeInfo.publishedDate,
      pageCount: volumeInfo.pageCount,
      description: volumeInfo.description,
      categories: volumeInfo.categories,
      textSnippet: book.searchInfo?.textSnippet,
      title: volumeInfo.title,
      author: volumeInfo.authors,
    };
  } catch (error) {
    console.error('Error fetching Google Books info', error);
    return null;
  }
};
