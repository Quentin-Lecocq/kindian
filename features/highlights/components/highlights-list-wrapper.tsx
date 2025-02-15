'use client';

import { PaginatedHighlights } from '../actions/highlights';
import HighlightsList from './highlights-list';

type HighlightsListWrapperProps = {
  initialData: PaginatedHighlights;
};

const HighlightsListWrapper = ({ initialData }: HighlightsListWrapperProps) => {
  return <HighlightsList initialData={initialData} />;
};

export default HighlightsListWrapper;
