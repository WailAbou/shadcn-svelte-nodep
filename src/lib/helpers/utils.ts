import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Align, Position, Side } from './types';
import { get, writable, type Writable } from 'svelte/store';

export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}

export function removeValue<T>(source: T[], target: T): T[] {
	const index = source.indexOf(target);
	if (index !== -1) {
		source.splice(index, 1);
	}
	return source;
}

export function hasValue<T>(source: undefined | T | T[], target: T): boolean {
	return (!Array.isArray(source) && source === target) || (Array.isArray(source) && source?.includes(target));
}

export function delayValue<T>(target: Writable<T>, valueToDelay: T, delay: number = 100): Writable<T> {
	const delayedTarget: Writable<T> = writable(get(target));
	target.subscribe((value) => {
		if (value == valueToDelay) setTimeout(() => delayedTarget.set(get(target)), delay);
		else delayedTarget.set(value);
	});
	return delayedTarget;
}

export function getPosition(centerElement: HTMLElement, targetElement: HTMLElement, side: Side, align: Align, sideOffset: number = 0, alignOffest: number = 0): Position {
	const [center, target] = [centerElement?.getBoundingClientRect(), targetElement?.getBoundingClientRect()];
	let [x, y] = [0, 0];

	if (!center || !target) return { x: 0, y: 0 };

	switch (side) {
		case 'top':
			x = getAlign(center.x, center.width, target.width, align);
			y = center.y - target.height - 5;
			break;
		case 'right':
			x = center.x + center.width + 5;
			y = getAlign(center.y, center.height, target.height, align);
			break;
		case 'bottom':
			x = getAlign(center.x, center.width, target.width, align);
			y = center.y + center.height + 5;
			break;
		case 'left':
			x = center.x - target.width - 5;
			y = getAlign(center.y, center.height, target.height, align);
			break;
	}

	return { x: x + alignOffest, y: y + sideOffset };
}

function getAlign(centerStart: number, centerLength: number, targetLength: number, align: Align): number {
	switch (align) {
		case 'start':
			return centerStart;
		case 'center':
			return centerStart + centerLength / 2 - targetLength / 2;
		case 'end':
			return centerStart - targetLength + centerLength;
		default:
			return 0;
	}
}
