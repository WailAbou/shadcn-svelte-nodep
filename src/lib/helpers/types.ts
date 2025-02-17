import type { Writable } from 'svelte/store';

export type SimpleAction = (index: number) => void;

export type InitProps = [string | Writable<string>, Writable<boolean>, Writable<InitResult>];

export type InitFunction = (node: HTMLElement, [value, item, initResult]: InitProps) => void;

export interface InitResult {
	toggleItem: VoidFunction;
	index: number;
	currentValue?: Writable<string>;
}

export interface InitReturns {
	methods: { init: InitFunction; toggle: SimpleAction; focus: SimpleAction; reset: VoidFunction };
	variables: { values: Writable<string>[]; items: Writable<boolean>[]; activeIndex: Writable<number> };
}

export type SelectionMode = 'single' | 'multiple';

export type Direction = 'ltr' | 'rtl';

export type Orientation = 'horizontal' | 'vertical';

export type NavigationDirection = 'horizontal' | 'vertical' | 'both';

export type Side = 'top' | 'right' | 'bottom' | 'left';

export type Align = 'start' | 'center' | 'end';

export type Position = { x: number; y: number };

export type KeyCombination = 'always' | 'never' | 'ignore';
