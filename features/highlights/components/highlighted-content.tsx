import { ContextMenu, ContextMenuTrigger } from '@/components/ui/context-menu';
import { mergeRanges } from '../utils/merge-range';
import SubHighlightDeleteMenu from './subhighlight-delete-menu';

type SubHighlight = {
  id: string;
  startIndex: number;
  endIndex: number;
};

type HighlightedContentProps = {
  content: string;
  subHighlights: SubHighlight[];
  onDelete: (id: string) => void;
};

const HighlightedContent = ({
  content,
  subHighlights,
  onDelete,
}: HighlightedContentProps) => {
  if (!subHighlights.length) {
    return <div className="whitespace-pre-wrap">{content}</div>;
  }

  const mergedRanges = mergeRanges(subHighlights);
  const elements = [];

  if (mergedRanges[0].startIndex > 0) {
    elements.push(
      <span key="text-start">
        {content.slice(0, mergedRanges[0].startIndex)}
      </span>
    );
  }

  mergedRanges.forEach((range, index) => {
    elements.push(
      <ContextMenu key={`highlight-${index}`}>
        <ContextMenuTrigger>
          <mark className="bg-neutral-300 rounded-sm cursor-pointer hover:bg-neutral-400 transition-colors">
            {content.slice(range.startIndex, range.endIndex)}
          </mark>
        </ContextMenuTrigger>
        <SubHighlightDeleteMenu ids={range.ids} onDelete={onDelete} />
      </ContextMenu>
    );

    const nextRange = mergedRanges[index + 1];
    if (nextRange) {
      elements.push(
        <span key={`text-${index}`}>
          {content.slice(range.endIndex, nextRange.startIndex)}
        </span>
      );
    }
  });

  const lastRange = mergedRanges[mergedRanges.length - 1];
  if (lastRange.endIndex < content.length) {
    elements.push(
      <span key="text-end">{content.slice(lastRange.endIndex)}</span>
    );
  }

  return <div className="whitespace-pre-wrap">{elements}</div>;
};

export default HighlightedContent;
