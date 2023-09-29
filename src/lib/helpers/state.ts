import { writable, type Writable } from 'svelte/store';
import type { InitFunctionType, InitProps, NavigationDirection } from './types';

const defaultNav = (index: number) => {
	index;
};

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

export function createKeyboardNavigation({ event, activeIndex, max, next, previous, last = defaultNav, first = defaultNav, navDir = 'both', loop = true }: KeyboardInteractionParams): void {
	const { code } = event;

	const nextDir = navDir == 'horizontal' ? 'Right' : 'Down';
	const prevDir = navDir == 'horizontal' ? 'Left' : 'Up';

	const nextPressed: boolean = navDir == 'both' ? code === 'ArrowRight' || code === 'ArrowDown' : code === `Arrow${nextDir}`;
	const previousPressed: boolean = navDir == 'both' ? code === 'ArrowLeft' || code === 'ArrowUp' : code === `Arrow${prevDir}`;

	const lastPressed: boolean = code === 'End';
	const firstPressed: boolean = code === 'Home';

	if (nextPressed || previousPressed || lastPressed || firstPressed) {
		event.preventDefault();

		if (nextPressed) next?.(loop ? (activeIndex + 1) % max : Math.min(activeIndex + 1, max - 1));
		else if (previousPressed) previous?.(loop ? (activeIndex - 1 + max) % max : Math.max(activeIndex - 1, 0));
		else if (lastPressed) last?.(max - 1);
		else if (firstPressed) first?.(0);
	}
}

export function createInit(defaultValue: string | string[] | undefined, select: typeof defaultNav, toggle: typeof defaultNav): [InitFunctionType, string[], Writable<boolean>[], HTMLButtonElement[]] {
	const values: string[] = [];
	const stores: Writable<boolean>[] = [];
	const triggers: HTMLButtonElement[] = [];

	const init = (element: Node, { store, value, initResult }: InitProps) => {
		values.push(value);
		stores.push(store);
		triggers.push(element as HTMLButtonElement);

		const index = stores.length - 1;
		if (value === defaultValue) select(index);
		const toggleItem = () => toggle(index);

		[initResult.toggleItem, initResult.index] = [toggleItem, index];
	};

	return [init, values, stores, triggers];
}

export function createAnimationEnd(state: Writable<boolean>): [Writable<boolean>, (event: AnimationEvent) => void] {
	const finishedAnimation: Writable<boolean> = writable(true);

	state.subscribe((newState) => {
		if (newState) finishedAnimation.set(false);
	});

	const onAnimationEnd = (event: AnimationEvent) => {
		if (event.animationName === 'exit') finishedAnimation.set(true);
	};

	return [finishedAnimation, onAnimationEnd];
}
