import type { Writable } from 'svelte/store';

export type InitProps = [string, Writable<boolean>, InitResult];

export type InitFunction = (node: HTMLButtonElement, [value, item, initResult]: InitProps) => void;

export class InitResult {
	public toggleItem: VoidFunction = () => {};
	public index: number = 0;
}

export type Direction = 'ltr' | 'rtl';

export type NavigationDirection = 'vertical' | 'horizontal' | 'both';

export type Side = 'top' | 'right' | 'bottom' | 'left';

export type Align = 'start' | 'center' | 'end';

export type Position = { x: number; y: number };

export interface InitReturns {
	methods: { init: InitFunction };
	values: { allValues: string[]; items: Writable<boolean>[]; triggers: HTMLButtonElement[]; activeIndex: number };
}
