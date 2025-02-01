export const createSubhighlight = async (
  highlightId: string,
  startIndex: number,
  endIndex: number
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/highlights/${highlightId}/sub`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ startIndex, endIndex }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create subhighlight');
  }

  return response.json();
};
