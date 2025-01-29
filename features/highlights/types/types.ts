import { Tables } from '@/database.types';
import { Note } from '@/features/notes/types/types';

export type Highlight = Tables<'Highlight'>;

export type HighlightWithNotes = Highlight & {
  notes: Note[];
};
