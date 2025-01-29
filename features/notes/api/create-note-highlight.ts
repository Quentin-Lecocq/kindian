export const createNoteHighlight = async (
  highlightId: string,
  content: string
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/notes/highlight/${highlightId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create note');
  }
};
