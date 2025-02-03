import NoteListServer from '@/features/notes/components/note-list-server';
import TagList from '@/features/tags/components/tag-list';
import { Highlight } from '@prisma/client';
import HighlightActionsFooter from './highlight-actions-footer';

type HighlightItemProps = {
  highlight: Highlight;
};

const HighlightItem = async ({ highlight }: HighlightItemProps) => {
  const { id, bookTitle, bookAuthor, content } = highlight;
  return (
    <div key={id} className="text-foreground border-b border-border py-4">
      <h3 className="text-lg font-medium mb-2">
        {bookTitle}{' '}
        <span className="text-muted-foreground text-sm">by {bookAuthor}</span>
      </h3>
      <div className="text-foreground text-sm">{content}</div>
      <NoteListServer highlightId={id} />
      <div className="flex mt-3 gap-4">
        <HighlightActionsFooter highlight={highlight} />
        <div className="flex items-center gap-2">
          <TagList highlightId={id} />
        </div>
      </div>
    </div>
  );
};

export default HighlightItem;
