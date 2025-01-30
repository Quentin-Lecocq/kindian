'use client';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SortAsc, SortDesc } from 'lucide-react';
import { useSortStore } from '../stores/use-sort-store';
import { ICON_SIZE } from '../utils/constants';
import { SortBy } from '../utils/types';

const SortControls = () => {
  const { order, setOrder, setOrderBy } = useSortStore();

  return (
    <div className="flex items-center gap-2 mb-2">
      <Button
        onClick={() => setOrder('asc')}
        variant={order === 'asc' ? 'default' : 'outline'}
      >
        <SortAsc
          height={ICON_SIZE}
          width={ICON_SIZE}
          className="text-muted-foreground"
        />
      </Button>
      <Button
        onClick={() => setOrder('desc')}
        variant={order === 'desc' ? 'default' : 'outline'}
      >
        <SortDesc
          height={ICON_SIZE}
          width={ICON_SIZE}
          className="text-muted-foreground"
        />
      </Button>
      <Select onValueChange={(value: SortBy) => setOrderBy(value)}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="addedAt">AddedAt</SelectItem>
            <SelectItem value="isFavorite">Favorite</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SortControls;
