import type { Writable } from 'svelte/store';

export type SimpleAction = (index: number) => void;

export type InitProps = [string, Writable<boolean>, Writable<InitResult>];

export type InitFunction = (node: HTMLButtonElement, [value, item, initResult]: InitProps) => void;

export interface InitResult {
	toggleItem: VoidFunction;
	index: number;
	currentValue?: Writable<string>;
}

export interface InitReturns {
	methods: { init: InitFunction; toggle: SimpleAction; focus: SimpleAction };
	values: { allValues: string[]; items: Writable<boolean>[]; activeIndex: Writable<number> };
}

export type Direction = 'ltr' | 'rtl';

export type Orientation = 'horizontal' | 'vertical';

export type NavigationDirection = 'horizontal' | 'vertical' | 'both';

export type Side = 'top' | 'right' | 'bottom' | 'left';

export type Align = 'start' | 'center' | 'end';

export type Position = { x: number; y: number };
