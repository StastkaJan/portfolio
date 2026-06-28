import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Theme = 'dark' | 'light';

const stored = browser ? ((localStorage.getItem('theme') as Theme) ?? 'dark') : 'dark';

export const theme = writable<Theme>(stored);

theme.subscribe((value) => {
	if (browser) {
		localStorage.setItem('theme', value);
		document.documentElement.setAttribute('data-theme', value);
	}
});
