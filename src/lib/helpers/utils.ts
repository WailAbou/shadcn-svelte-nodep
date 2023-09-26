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
	activeIndex: number;
	max: number;
	next: typeof defaultNav;
	previous: typeof defaultNav;
	last?: typeof defaultNav;
	first?: typeof defaultNav;
	navDir?: NavigationDirection;
	loop?: boolean;
};

export function handleKeyboardInteraction({ event, activeIndex, max, next, previous, last = defaultNav, first = defaultNav, navDir = 'both', loop = true }: KeyboardInteractionParams): void {
	const { key } = event;

	const nextDir = navDir == 'horizontal' ? 'Right' : 'Down';
	const prevDir = navDir == 'horizontal' ? 'Left' : 'Up';

	const nextPressed: boolean = navDir == 'both' ? key === 'ArrowRight' || key === 'ArrowDown' : key === `Arrow${nextDir}`;
	const previousPressed: boolean = navDir == 'both' ? key === 'ArrowLeft' || key === 'ArrowUp' : key === `Arrow${prevDir}`;

	const lastPressed: boolean = key === 'End';
	const firstPressed: boolean = key === 'Home';

	if (nextPressed || previousPressed || lastPressed || firstPressed) {
		event.preventDefault();

		if (nextPressed) next?.(loop ? (activeIndex + 1) % max : Math.min(activeIndex + 1, max - 1));
		else if (previousPressed) previous?.(loop ? (activeIndex - 1 + max) % max : Math.max(activeIndex - 1, 0));
		else if (lastPressed) last?.(max - 1);
		else if (firstPressed) first?.(0);
	}
}
