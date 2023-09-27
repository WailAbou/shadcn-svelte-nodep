import type { Writable } from 'svelte/store';

export interface InitProps<T> {
	store: Writable<T>;
	value: string;
	initResult: InitResult;
}

export type InitFunction<T> = (node: Node, { store, value, initResult }: InitProps<T>) => void;

export class InitResult {
	public toggleItem: VoidFunction = console.log;
	public index: number = 0;
}

export type NavigationDirection = 'vertical' | 'horizontal' | 'both';
