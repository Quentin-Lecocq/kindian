import { APIResponse } from '@/types/api';
import { getAccessToken } from '@/utils/user';
import {
  GetHighlightsParams,
  HighlightWithNotesAndSubHighlightsAndTags,
} from '../utils/types';

export const highlightApi = {
  getHighlights: async (params?: GetHighlightsParams) => {
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

    const { data } = (await response.json()) as APIResponse<
      HighlightWithNotesAndSubHighlightsAndTags[]
    >;
    if (!data) throw new Error('No data received from server');

    return data;
  },
  favoriteHighlight: async (
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
  },
  editHighlight: async (id: string, content: string): Promise<void> => {
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
  },
  deleteHighlight: async (highlightId: string): Promise<void> => {
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
  },
  createHighlightTag: async (
    highlightId: string,
    content: string
  ): Promise<void> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/highlights/${highlightId}/tag`,
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
      throw new Error(error.message || 'Failed to create tag');
    }

    return response.json();
  },
  deleteHighlightTag: async (
    highlightId: string,
    tagId: string
  ): Promise<void> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/highlights/${highlightId}/tag/${tagId}`,
      {
        method: 'DELETE',
      }
    );

    if (!response.ok) {
      throw new Error('Failed to delete highlight tag');
    }

    return response.json();
  },
  createSubhighlight: async (
    highlightId: string,
    startIndex: number,
    endIndex: number
  ): Promise<void> => {
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
  },
  deleteSubhighlight: async (subhighlightId: string): Promise<void> => {
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
  },
};
