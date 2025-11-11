import { create } from 'zustand';

export type TransactionFilterType = '' | 'income' | 'expense';

export interface FiltersState {
	category: string;
	type: TransactionFilterType;
	setCategory: (category: string) => void;
	setType: (type: TransactionFilterType) => void;
}

export const useFiltersStore = create<FiltersState>()((set) => ({
	category: '',
	type: '',
	setCategory: (category: string) => set({ category }),
	setType: (type: TransactionFilterType) => set({ type }),
}));

export default useFiltersStore;
