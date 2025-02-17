import { writable, type Writable } from 'svelte/store';
import type { toastVariants } from './toastVariants';
import type { VariantProps } from 'class-variance-authority';

interface ToastSettings {
	variant?: VariantProps<typeof toastVariants>['variant'];
	title?: string;
	description?: string;
	actionLabel?: string;
	actionEvent?: VoidFunction;
}

export interface Toast extends ToastSettings {
	id: number;
	open: boolean;
}

export const toasts: Writable<Toast[]> = writable([]);

export function toast(settings: ToastSettings) {
	const newToast: Toast = {
		...settings,
		variant: settings?.variant ?? 'default',
		id: Date.now(),
		open: true
	};

	toasts.update((currentToasts) => [...currentToasts, newToast]);
}
