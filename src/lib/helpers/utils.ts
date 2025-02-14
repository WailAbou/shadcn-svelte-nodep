import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Align, Position, Side } from './types';

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

export function isNearElement(mouseEvent: MouseEvent | null, element: HTMLElement, side?: Side, sideoffset: number = 0): boolean {
	if (!mouseEvent || !element) return false;

	const rect = element.getBoundingClientRect();
	const { clientX: mouseX, clientY: mouseY } = mouseEvent;

	if (side === 'top') {
		const distance = Math.abs(mouseY - rect.bottom);
		return distance <= sideoffset + 5 && mouseX >= rect.left && mouseX <= rect.right;
	} else if (side === 'bottom') {
		const distance = Math.abs(mouseY - rect.top);
		return distance <= sideoffset + 5 && mouseX >= rect.left && mouseX <= rect.right;
	} else if (side === 'left') {
		const distance = Math.abs(mouseX - rect.right);
		return distance <= sideoffset + 5 && mouseY >= rect.top && mouseY <= rect.bottom;
	} else if (side === 'right') {
		const distance = Math.abs(mouseX - rect.left);
		return distance <= sideoffset + 5 && mouseY >= rect.top && mouseY <= rect.bottom;
	}

	return false;
}

export function getPosition(centerElement: HTMLElement, targetElement: HTMLElement, side: Side, align: Align, sideOffset: number = 0, alignOffest: number = 0): Position {
	const [center, target] = [centerElement?.getBoundingClientRect(), targetElement?.getBoundingClientRect()];
	let [x, y] = [0, 0];

	if (!center || !target) return { x: 0, y: 0 };

	switch (side) {
		case 'top':
			x = getAlign(center.x, center.width, target.width, align, alignOffest);
			y = center.y - target.height - 5 - sideOffset;
			break;
		case 'right':
			x = center.x + center.width + 5 + sideOffset;
			y = getAlign(center.y, center.height, target.height, align, alignOffest);
			break;
		case 'bottom':
			x = getAlign(center.x, center.width, target.width, align, alignOffest);
			y = center.y + center.height + 5 + sideOffset;
			break;
		case 'left':
			x = center.x - target.width - 5 - sideOffset;
			y = getAlign(center.y, center.height, target.height, align, alignOffest);
			break;
	}

	return { x, y };
}

function getAlign(centerStart: number, centerLength: number, targetLength: number, align: Align, alignOffest: number = 0): number {
	switch (align) {
		case 'start':
			return centerStart + alignOffest;
		case 'center':
			return centerStart + centerLength / 2 - targetLength / 2;
		case 'end':
			return centerStart - targetLength + centerLength - alignOffest;
		default:
			return 0;
	}
}

function clamp(value: number, min: number, max: number) {
	return Math.min(Math.max(value, min), max);
}
