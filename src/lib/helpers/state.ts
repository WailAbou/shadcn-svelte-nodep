import { get, writable, type Writable } from 'svelte/store';
import type { InitProps, InitReturns, NavigationDirection, SimpleAction } from './types';

export function createKeyboardNavigation(
	event: KeyboardEvent,
	action: SimpleAction,
	activeIndex: Writable<number>,
	max: number,
	navDir: NavigationDirection = 'both',
	skip: boolean = false,
	tab: boolean = false,
	loop: boolean = true
): void {
	const { code, shiftKey } = event;
	const index = get(activeIndex);
	const nextDir = navDir == 'horizontal' ? 'Right' : 'Down';
	const prevDir = navDir == 'horizontal' ? 'Left' : 'Up';

	const nextTabPressed: boolean = code === 'Tab' && !shiftKey && tab;
	const previousTabPressed: boolean = code === 'Tab' && shiftKey && tab;

	if (nextTabPressed) activeIndex.set(Math.min(index + 1, max - 1));
	else if (previousTabPressed) activeIndex.set(Math.max(index - 1, 0));

	const nextPressed: boolean = navDir == 'both' ? code === 'ArrowRight' || code === 'ArrowDown' : code === `Arrow${nextDir}`;
	const previousPressed: boolean = navDir == 'both' ? code === 'ArrowLeft' || code === 'ArrowUp' : code === `Arrow${prevDir}`;

	if (nextPressed || previousPressed) {
		event.preventDefault();
		if (nextPressed) action(loop ? (index + 1) % max : Math.min(index + 1, max - 1));
		else if (previousPressed) action(loop ? (index - 1 + max) % max : Math.max(index - 1, 0));
	}

	const lastPressed: boolean = code === 'End';
	const firstPressed: boolean = code === 'Home';

	if (skip && (lastPressed || firstPressed)) {
		event.preventDefault();
		if (lastPressed) action(max - 1);
		else if (firstPressed) action(0);
	}
}

export function createState(defaultValue: string | string[] | undefined, select: SimpleAction, currentValue?: Writable<string>): InitReturns {
	const values: Writable<string>[] = [];
	const items: Writable<boolean>[] = [];
	const triggers: HTMLElement[] = [];
	const activeIndex: Writable<number> = writable(0);

	const init = (element: HTMLElement, [value, item, initResult]: InitProps) => {
		const writableValue: Writable<string> = typeof value === 'string' ? writable(value) : value;

		values.push(writableValue);
		items.push(item);
		triggers.push(element);

		const index = items.length - 1;
		if (get(writableValue) === defaultValue) select(index);
		const toggleItem = () => toggle(index);

		initResult.set({ toggleItem, index, currentValue });
	};

	function toggle(index: number) {
		focus(index);
		select(index);
	}

	function focus(index: number) {
		triggers[index]?.focus();
		activeIndex.set(index);
	}

	function reset() {
		values.length = 0;
		items.length = 0;
		triggers.length = 0;
	}

	return { methods: { init, toggle, focus, reset }, variables: { values, items, activeIndex } };
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
