import type { Writable } from 'svelte/store';

export interface InitProps {
	store: Writable<boolean>;
	value: string;
	initResult: InitResult;
}

export type InitFunctionType = (node: Node, { store, value, initResult }: InitProps) => void;

export class InitResult {
	public toggleItem: VoidFunction = console.log;
	public index: number = 0;
}

export type NavigationDirection = 'vertical' | 'horizontal' | 'both';
