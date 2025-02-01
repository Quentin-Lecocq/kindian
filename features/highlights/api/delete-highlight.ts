export const deleteHighlight = async (highlightId: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/highlights/${highlightId}`,
    {
      method: 'DELETE',
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete highlight');
  }
};
