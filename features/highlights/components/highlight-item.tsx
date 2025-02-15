import NoteListWrapper from '@/features/notes/components/note-list-wrapper';
import TagListWrapper from '@/features/tags/components/tag-list-wrapper';
import { HighlightWithTagsAndNotes } from '../types/types';
import HighlightActions from './highlight-actions';

type HighlightItemProps = {
  highlight: HighlightWithTagsAndNotes;
};

const HighlightItem = ({ highlight }: HighlightItemProps) => {
  const { id, bookTitle, bookAuthor, content, highlightTags, notes, location } =
    highlight;

  return (
    <div key={id} className="text-foreground border-b border-border py-4">
      <h3 className="text-lg font-medium">
        {bookTitle}{' '}
        <span className="text-muted-foreground text-sm">by {bookAuthor}</span>
      </h3>
      <p className="text-muted-foreground text-sm mb-2">Location: {location}</p>
      <div className="text-foreground text-sm">{content}</div>
      <NoteListWrapper highlightId={id} initialNotes={notes} />
      <div className="flex mt-3 gap-4">
        <HighlightActions highlight={highlight} />
        <div className="flex items-center gap-2">
          <TagListWrapper highlightId={id} initialTags={highlightTags} />
        </div>
      </div>
    </div>
  );
};

export default HighlightItem;
