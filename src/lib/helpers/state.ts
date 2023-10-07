import { writable, type Writable } from 'svelte/store';
import type { InitProps, InitReturns, NavigationDirection } from './types';

type Action = (index: number) => void;

export function createKeyboardNavigation(
	event: KeyboardEvent,
	action: Action,
	activeIndex: number,
	maxIndex: number,
	navDir: NavigationDirection = 'both',
	skip: boolean = false,
	loop: boolean = true
): void {
	const { code } = event;
	const nextDir = navDir == 'horizontal' ? 'Right' : 'Down';
	const prevDir = navDir == 'horizontal' ? 'Left' : 'Up';

	const nextPressed: boolean = navDir == 'both' ? code === 'ArrowRight' || code === 'ArrowDown' : code === `Arrow${nextDir}`;
	const previousPressed: boolean = navDir == 'both' ? code === 'ArrowLeft' || code === 'ArrowUp' : code === `Arrow${prevDir}`;

	if (nextPressed || previousPressed) {
		event.preventDefault();
		if (nextPressed) action(loop ? (activeIndex + 1) % maxIndex : Math.min(activeIndex + 1, maxIndex - 1));
		else if (previousPressed) action(loop ? (activeIndex - 1 + maxIndex) % maxIndex : Math.max(activeIndex - 1, 0));
	}

	const lastPressed: boolean = code === 'End';
	const firstPressed: boolean = code === 'Home';

	if (skip && (lastPressed || firstPressed)) {
		event.preventDefault();
		if (lastPressed) action(maxIndex - 1);
		else if (firstPressed) action(0);
	}
}

export function createInit(defaultValue: string | string[] | undefined, select: Action, toggle: Action): InitReturns {
	const allValues: string[] = [];
	const items: Writable<boolean>[] = [];
	const triggers: HTMLButtonElement[] = [];
	const activeIndex: number = 0;

	const init = (element: HTMLButtonElement, [value, item, initResult]: InitProps) => {
		allValues.push(value);
		items.push(item);
		triggers.push(element);

		const index = items.length - 1;
		if (value === defaultValue) select(index);
		const toggleItem = () => toggle(index);

		[initResult.toggleItem, initResult.index] = [toggleItem, index];
	};

	return { methods: { init }, values: { allValues, items, triggers, activeIndex } };
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
