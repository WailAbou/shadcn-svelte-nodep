import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import type { Writable } from "svelte/store";
import { twMerge } from "tailwind-merge";

export interface InitProps<T> {
	store: Writable<T>;
	value: string;
	onInit: (result: InitResult) => void;
}

export type InitFunction<T> = (node: Node, { store, value, onInit }: InitProps<T>) => void;

export type InitResult = { toggleItem: VoidFunction, index: number };

export function cn(...inputs: ClassValue[]): string {
  	return twMerge(clsx(inputs));
}

export function removeValue<T>(source: T[], target: T): T[] {
	const index = source.indexOf(target);
	if (index !== -1) {
		source.splice(index, 1);
	}
	return source;
};

export function hasValue<T>(source: undefined | T | T[], target: T): boolean {
	return !Array.isArray(source) && source === target || Array.isArray(source) && source?.includes(target);
}

export function clickOutside(node: Node, callbackFunction: VoidFunction) {
	const onClick = (event: MouseEvent) => {
		if (!node.contains(event.target as Node)) callbackFunction();
	}

	document.body.addEventListener('click', onClick);

	return {
		update(newCallbackFunction: VoidFunction) { callbackFunction = newCallbackFunction; },
		destroy() { document.body.removeEventListener('click', onClick); }
	}
}