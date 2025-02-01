export const editHighlight = async (id: string, content: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/highlights/${id}`,
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
    throw new Error(error.message || 'Failed to edit highlight');
  }
};
