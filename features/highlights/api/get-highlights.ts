import { HighlightWithNotes } from '@/features/highlights/types/types';
import { APIResponse } from '@/types/api';
import { getAccessToken } from '@/utils/user';

export interface GetHighlightsParams {
  orderBy?: 'addedAt' | 'isFavorite';
  order?: 'asc' | 'desc';
}

export const getHighlights = async (
  params?: GetHighlightsParams
): Promise<HighlightWithNotes[]> => {
  const token = await getAccessToken();
  if (!token) throw new Error('No token available');

  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/highlights`);
  if (params?.orderBy) url.searchParams.append('orderBy', params.orderBy);
  if (params?.order) url.searchParams.append('order', params.order);

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

  const { data } = (await response.json()) as APIResponse<HighlightWithNotes[]>;
  if (!data) throw new Error('No data received from server');

  return data;
};
