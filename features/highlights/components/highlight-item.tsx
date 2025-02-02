import NoteList from '@/features/notes/components/note-list';
import TagList from '@/features/tags/components/tag-list';
import { Highlight } from '@prisma/client';
import HighlightActionsFooter from './highlight-actions-footer';

type HighlightItemProps = {
  highlight: Highlight;
};

const HighlightItem = ({ highlight }: HighlightItemProps) => {
  return (
    <div
      key={highlight.id}
      className="text-foreground border-b border-border py-4"
    >
      <h3 className="text-lg font-medium mb-2">
        {highlight.bookTitle}{' '}
        <span className="text-muted-foreground text-sm">
          by {highlight.bookAuthor}
        </span>
      </h3>
      <div className="text-foreground text-sm">{highlight.content}</div>
      <NoteList highlightId={highlight.id} />
      <div className="flex mt-3 gap-4">
        <HighlightActionsFooter highlight={highlight} />
        <div className="flex items-center gap-2">
          <TagList highlightId={highlight.id} />
        </div>
      </div>
    </div>
  );
};

export default HighlightItem;
