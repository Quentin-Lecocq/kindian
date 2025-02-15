import { Button } from '@/components/ui/button';
import { ICON_CLASSNAME, ICON_SIZE } from '@/utils/constants';
import { Tag } from '@prisma/client';
import { X } from 'lucide-react';

type TagItemProps = {
  tag: Tag;
  onDelete: () => void;
};

const TagItem = ({ tag, onDelete }: TagItemProps) => {
  const { name } = tag;

  return (
    <div className="bg-foreground flex items-center gap-1 px-1 py-1">
      <p className="text-xs text-background pl-1">{name}</p>
      <Button variant="link" onClick={onDelete} className="p-0 h-fit">
        <X size={ICON_SIZE} className={ICON_CLASSNAME} />
      </Button>
    </div>
  );
};

export default TagItem;
