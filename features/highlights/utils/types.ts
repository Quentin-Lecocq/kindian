import { Tables } from '@/database.types';
import { Note } from '@/features/notes/utils/types';

export type Highlight = Tables<'Highlight'>;
export type SubHighlight = Tables<'SubHighlight'>;
export type Tag = Tables<'Tag'>;
export type HighlightTag = Tables<'HighlightTag'>;

export type HighlightWithNotesAndSubHighlightsAndTags = Highlight & {
  notes: Note[];
  subHighlights: SubHighlight[];
  highlightTags: (HighlightTag & {
    tag: Tag;
  })[];
};

// zustand
export type SortOrder = 'asc' | 'desc';
export type SortBy = 'addedAt' | 'isFavorite';

// api
export interface GetHighlightsParams {
  orderBy?: SortBy;
  order?: SortOrder;
}
