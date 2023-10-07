import type { Writable } from 'svelte/store';

export type InitProps = [Writable<boolean>, string, InitResult];

export type InitFunction = (node: Node, [store, value, initResult]: InitProps) => void;

export class InitResult {
	public toggleItem: VoidFunction = console.log;
	public index: number = 0;
}

export type Direction = 'ltr' | 'rtl';

export type NavigationDirection = 'vertical' | 'horizontal' | 'both';

export type Side = 'top' | 'right' | 'bottom' | 'left';

export type Align = 'start' | 'center' | 'end';

export type Position = { x: number; y: number };
