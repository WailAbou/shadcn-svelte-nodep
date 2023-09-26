import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { NavigationDirection } from './types';

export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}

export function removeValue<T>(source: T[], target: T): T[] {
	const index = source.indexOf(target);
	if (index !== -1) {
		source.splice(index, 1);
	}
	return source;
}

export function hasValue<T>(source: undefined | T | T[], target: T): boolean {
	return (!Array.isArray(source) && source === target) || (Array.isArray(source) && source?.includes(target));
}

const defaultNav = (_: number) => {};

type KeyboardInteractionParams = {
	event: KeyboardEvent;
	focusedIndex: number;
	max: number;
	focusNext: typeof defaultNav;
	focusPrevious: typeof defaultNav;
	focusLast?: typeof defaultNav;
	focusFirst?: typeof defaultNav;
	navDir?: NavigationDirection;
	loop?: boolean;
};

export function handleKeyboardInteraction({
	event,
	focusedIndex,
	max,
	focusNext,
	focusPrevious,
	focusLast = defaultNav,
	focusFirst = defaultNav,
	navDir = 'both',
	loop = true
}: KeyboardInteractionParams): void {
	const { key } = event;

	const nextDir = navDir == 'horizontal' ? 'Right' : 'Down';
	const prevDir = navDir == 'horizontal' ? 'Left' : 'Up';

	const next: boolean = navDir == 'both' ? key === 'ArrowRight' || key === 'ArrowDown' : key === `Arrow${nextDir}`;
	const previous: boolean = navDir == 'both' ? key === 'ArrowLeft' || key === 'ArrowUp' : key === `Arrow${prevDir}`;

	const last: boolean = key === 'End';
	const first: boolean = key === 'Home';

	if (next || previous || last || first) {
		event.preventDefault();

		if (next) focusNext?.((focusedIndex + 1) % max);
		else if (previous) focusPrevious?.((focusedIndex - 1 + max) % max);
		else if (last) focusLast?.(max - 1);
		else if (first) focusFirst?.(0);
	}
}
