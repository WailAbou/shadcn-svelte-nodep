import type { Writable } from 'svelte/store';

export interface InitProps<T> {
	store: Writable<T>;
	value: string;
	onInit: (result: InitResult) => void;
}

export type InitFunction<T> = (node: Node, { store, value, onInit }: InitProps<T>) => void;

export type InitResult = { toggleItem: VoidFunction; index: number };