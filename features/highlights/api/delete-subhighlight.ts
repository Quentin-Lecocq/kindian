export const deleteSubhighlight = async (subhighlightId: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/highlights/sub/${subhighlightId}`,
    {
      method: 'DELETE',
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete subhighlight');
  }

  return response.json();
};
