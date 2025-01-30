import { Button } from '@/components/ui/button';
import { SortAsc, SortDesc } from 'lucide-react';
import { GetHighlightsParams } from '../api/get-highlights';

type SortControlsProps = {
  sortParams: GetHighlightsParams;
  setSortParams: (params: GetHighlightsParams) => void;
};

const SortControls = ({ sortParams, setSortParams }: SortControlsProps) => {
  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={() => setSortParams({ ...sortParams, order: 'asc' })}
        variant="outline"
      >
        <SortAsc height={16} width={16} className="text-muted-foreground" />
      </Button>
      <Button
        onClick={() => setSortParams({ ...sortParams, order: 'desc' })}
        variant="outline"
      >
        <SortDesc height={16} width={16} className="text-muted-foreground" />
      </Button>
      <Button
        disabled={sortParams.orderBy === 'addedAt'}
        onClick={() => setSortParams({ ...sortParams, orderBy: 'addedAt' })}
        variant="outline"
      >
        AddedAt
      </Button>
      <Button
        disabled={sortParams.orderBy === 'isFavorite'}
        onClick={() => setSortParams({ ...sortParams, orderBy: 'isFavorite' })}
        variant="outline"
      >
        Favorite
      </Button>
    </div>
  );
};

export default SortControls;
