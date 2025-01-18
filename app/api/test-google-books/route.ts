export const GET = async () => {
  const title = 'The Obstacle is the Way';
  const author = 'Ryan Holiday';

  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=intitle:${title}+inauthor:${author}&key=${process.env.GOOGLE_BOOKS_API_KEY}`
    );
    const data = await response.json();

    console.log('Google Books Response:', JSON.stringify(data, null, 2));

    return Response.json(data);
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ error: 'Failed to fetch' }, { status: 500 });
  }
};
