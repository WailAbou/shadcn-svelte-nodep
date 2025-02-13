import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Align, Position, Side } from './types';
import { get, writable, type Readable, type Writable } from 'svelte/store';

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

export function isInsideElement(mouseEvent: MouseEvent | null, element: HTMLElement): boolean {
	if (!mouseEvent || !element) return false;

	const rect = element.getBoundingClientRect();
	return mouseEvent.clientX >= rect.left && mouseEvent.clientX <= rect.right && mouseEvent.clientY >= rect.top && mouseEvent.clientY <= rect.bottom;
}

export function isNearElement(mouseEvent: MouseEvent | null, element: HTMLElement, side?: Side, sideoffset: number = 0, alignoffset: number = 0): boolean {
	if (!mouseEvent || !element) return false;

	const rect = element.getBoundingClientRect();
	const { clientX: mouseX, clientY: mouseY } = mouseEvent;
	const threshold = 5;

	if (side === 'top') {
		const distance = Math.abs(mouseY - rect.bottom);
		return distance <= alignoffset + threshold && mouseX >= rect.left && mouseX <= rect.right;
	} else if (side === 'bottom') {
		const distance = Math.abs(mouseY - rect.top);
		return distance <= alignoffset + threshold && mouseX >= rect.left && mouseX <= rect.right;
	} else if (side === 'left') {
		const distance = Math.abs(mouseX - rect.right);
		return distance <= sideoffset + threshold && mouseY >= rect.top && mouseY <= rect.bottom;
	} else if (side === 'right') {
		const distance = Math.abs(mouseX - rect.left);
		return distance <= sideoffset + threshold && mouseY >= rect.top && mouseY <= rect.bottom;
	}

	return false;
}

export function delayValue<T>(target: Writable<T>, valueToDelay: T, delay: number = 100): Readable<T> {
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

	x = clamp(x, 0, window.innerWidth);
	y = clamp(y, 0, window.innerHeight);

	return { x: x + sideOffset, y: y + alignOffest };
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

function clamp(value: number, min: number, max: number) {
	return Math.min(Math.max(value, min), max);
}
