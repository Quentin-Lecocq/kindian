import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
} from '@/components/ui/context-menu';
import { Trash } from 'lucide-react';

type SubHighlightDeleteMenuProps = {
  ids: string[];
  onDelete: (id: string) => void;
};

const SubHighlightDeleteMenu = ({
  ids,
  onDelete,
}: SubHighlightDeleteMenuProps) => {
  const hasMultipleHighlights = ids.length > 1;

  return (
    <ContextMenuContent>
      {hasMultipleHighlights ? (
        <>
          <ContextMenuItem className="text-sm text-gray-500" disabled>
            Surlignages superposés ({ids.length})
          </ContextMenuItem>
          <ContextMenuSeparator />
          {ids.map((id, idx) => (
            <ContextMenuItem
              key={id}
              className="text-foreground cursor-pointer"
              onClick={() => onDelete(id)}
            >
              <div className="flex gap-2 items-center">
                <Trash size={16} />
                Delete subhighlight {idx + 1}
              </div>
            </ContextMenuItem>
          ))}
        </>
      ) : (
        <ContextMenuItem
          className="text-foreground cursor-pointer"
          onClick={() => onDelete(ids[0])}
        >
          <div className="flex gap-2 items-center">
            <Trash size={16} />
            Delete subhighlight
          </div>
        </ContextMenuItem>
      )}
    </ContextMenuContent>
  );
};

export default SubHighlightDeleteMenu;
