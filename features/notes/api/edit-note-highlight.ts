export const editNoteHighlight = async (noteId: string, content: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/notes/${noteId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to edit note');
  }
};
