import { Tables } from '@/database.types';
import { Note } from '@/features/notes/utils/types';

export type Highlight = Tables<'Highlight'>;
export type SubHighlight = Tables<'SubHighlight'>;

export type HighlightWithNotesAndSubHighlights = Highlight & {
  notes: Note[];
  subHighlights: SubHighlight[];
};

// zustand
export type SortOrder = 'asc' | 'desc';
export type SortBy = 'addedAt' | 'isFavorite';
