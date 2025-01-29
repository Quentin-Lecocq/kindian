export const favoriteHighlight = async (
  highlightId: string,
  value: boolean
): Promise<void> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/highlights/${highlightId}/favorite`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ value }),
    }
  );

  return response.json();
};
