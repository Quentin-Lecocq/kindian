import { create } from 'zustand';
import { SortBy, SortOrder } from '../utils/types';

interface SortState {
  order: SortOrder;
  orderBy: SortBy;
  setOrder: (order: SortOrder) => void;
  setOrderBy: (orderBy: SortBy) => void;
  resetSort: () => void;
}

export const useSortStore = create<SortState>((set) => ({
  order: 'desc',
  orderBy: 'addedAt',
  setOrder: (order) => set({ order }),
  setOrderBy: (orderBy) => set({ orderBy }),
  resetSort: () => set({ order: 'desc', orderBy: 'addedAt' }),
}));
