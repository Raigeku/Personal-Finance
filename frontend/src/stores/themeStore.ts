import { create } from 'zustand';

export type ThemeMode = 'light' | 'dark';

interface ThemeState {
	mode: ThemeMode;
	setMode: (m: ThemeMode) => void;
	toggleMode: () => void;
}

const getInitialMode = (): ThemeMode => {
	try {
		const saved = localStorage.getItem('themeMode');
		if (saved === 'light' || saved === 'dark') return saved;
	} catch (e) {
		void e;
	}
	if (typeof window !== 'undefined' && window.matchMedia) {
		return window.matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light';
	}
	return 'light';
};

export const useThemeStore = create<ThemeState>((set) => ({
	mode: getInitialMode(),
	setMode: (m: ThemeMode) => {
		try {
			localStorage.setItem('themeMode', m);
		} catch (e) {
			void e;
		}
		set({ mode: m });
	},
	toggleMode: () =>
		set((state) => {
			const next: ThemeMode = state.mode === 'light' ? 'dark' : 'light';
			try {
				localStorage.setItem('themeMode', next);
			} catch (e) {
				void e;
			}
			return { mode: next };
		}),
}));

export default useThemeStore;
