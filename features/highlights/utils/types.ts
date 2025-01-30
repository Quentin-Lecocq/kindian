import { Tables } from '@/database.types';
import { Note } from '@/features/notes/types/types';

export type Highlight = Tables<'Highlight'>;

export type HighlightWithNotes = Highlight & {
  notes: Note[];
};

// zustand
export type SortOrder = 'asc' | 'desc';
export type SortBy = 'addedAt' | 'isFavorite';
