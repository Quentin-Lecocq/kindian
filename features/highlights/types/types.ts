import {
  HighlightTag,
  Note,
  Highlight as PrismaHighlight,
  Tag,
} from '@prisma/client';

export type HighlightWithTagsAndNotes = PrismaHighlight & {
  highlightTags: (HighlightTag & {
    tag: Tag;
  })[];
  notes: Note[];
};
