import { writable, type Writable } from 'svelte/store';
import type { toastVariants } from './toastVariants';
import type { VariantProps } from 'class-variance-authority';

interface ToastSettings {
	variant?: VariantProps<typeof toastVariants>['variant'];
	title?: string;
	description?: string;
	actionLabel?: string;
}

export interface Toast extends ToastSettings {
	open: boolean;
}

export const toasts: Writable<Toast[]> = writable([]);

export function useToast(settings: ToastSettings) {
	toasts.set([{ ...settings, variant: settings?.variant ?? 'default', open: true }]);
}
