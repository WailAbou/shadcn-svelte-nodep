import { writable } from 'svelte/store';

interface ToastSettings {
	title: string;
	description: string;
	actionLabel?: string;
}

interface Toast extends ToastSettings {
	active: boolean;
}

export const toast = writable<Toast>({ title: '', description: '', active: false });

export function useToast(settings: ToastSettings) {
	toast.set({ ...settings, active: true });
}
