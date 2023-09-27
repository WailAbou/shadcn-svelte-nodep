import type { Writable } from 'svelte/store';
import type { InitProps, NavigationDirection } from './types';

type interactType = (index: number, value: string) => void;

const defaultNav = (index: number) => {};

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

export function createInit(stores: Writable<boolean>[], elements: HTMLButtonElement[], defaultValue: string | string[] | undefined, select: interactType, toggle: interactType): [any, string[]] {
	const values: string[] = [];
	const init = (element: Node, { store, value, initResult }: InitProps<boolean>) => {
		values.push(value);
		stores.push(store);
		elements.push(element as HTMLButtonElement);

		const index = stores.length - 1;
		if (value === defaultValue) select(index, value);
		const toggleItem = () => toggle(index, value);

		[initResult.toggleItem, initResult.index] = [toggleItem, index];
	};
	return [init, values];
}
