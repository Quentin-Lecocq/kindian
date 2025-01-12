export const fetchBooksCover = async (
  title: string,
  author: string
): Promise<string> => {
  console.log(title, author);
  try {
    const response = await fetch(
      `https://openlibrary.org/search.json?title=${encodeURIComponent(
        title
      )}&author=${encodeURIComponent(author)}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch books cover.');
    }

    const data = await response.json();
    console.log(data);
    if (data.docs && data.docs.length > 0) {
      const book = data.docs[0];

      const isbn = book.isbn?.[0];
      if (isbn) {
        return `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
      }
    }

    return '/assets/book-cover.png';
  } catch (error) {
    console.error('Error fetching books cover:', error);
    return '/assets/book-cover.png';
  }
};
