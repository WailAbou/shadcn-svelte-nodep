import type { ActionReturn } from 'svelte/action';
import { get, type Writable } from 'svelte/store';

export function clickOutside(node: Node, [callback, except]: [VoidFunction, HTMLElement?]): ActionReturn<[VoidFunction, HTMLElement?]> {
	const onClick = (event: MouseEvent) => {
		const target = event.target as Node;
		if (!node.contains(target) && (!except || !except.contains(target))) {
			callback();
		}
	};

	document.body.addEventListener('click', onClick);

	return {
		update([newCallback, newExcept]: [VoidFunction, HTMLElement?]) {
			callback = newCallback;
			except = newExcept;
		},
		destroy() {
			document.body.removeEventListener('click', onClick);
		}
	};
}

export function keyDown(node: Node, [condition, callback, codes]: [Writable<boolean>, VoidFunction, string[]]): ActionReturn {
	const onKeyDown = (e: KeyboardEvent) => {
		if (get(condition) && codes.includes(e.code)) {
			e.preventDefault();
			callback();
		}
	};

	window.addEventListener('keydown', onKeyDown);

	return {
		destroy() {
			window.removeEventListener('keydown', onKeyDown);
		}
	};
}

export function preventDefault(node: Node, codes: string[]): ActionReturn {
	const onKeyDown = (event: Event) => {
		const e = event as KeyboardEvent;
		if (codes.includes(e.code)) e.preventDefault();
	};

	node.addEventListener('keydown', onKeyDown);

	return {
		destroy() {
			node.removeEventListener('keydown', onKeyDown);
		}
	};
}

export function preventScroll(window: Window, shouldPrevent: boolean): ActionReturn<boolean> {
	const onWheel = (e: Event) => {
		if (shouldPrevent) e.preventDefault();
	};

	window.addEventListener('wheel', onWheel, { passive: false });

	return {
		update(newShouldPrevent: boolean) {
			shouldPrevent = newShouldPrevent;
		},
		destroy() {
			window.removeEventListener('keydown', onWheel);
		}
	};
}

export function focusTrap(node: HTMLElement, enabled: boolean = true) {
	const elemWhitelist: string[] = [
		'a[href]',
		'area[href]',
		'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
		'select:not([disabled]):not([aria-hidden])',
		'textarea:not([disabled]):not([aria-hidden])',
		'button:not([disabled]):not([aria-hidden])',
		'iframe',
		'object',
		'embed',
		'[contenteditable]',
		'[tabindex]:not([tabindex^="-"])'
	];
	let elemFirst: HTMLElement;
	let elemLast: HTMLElement;

	function onFirstElemKeydown(e: KeyboardEvent): void {
		if (e.shiftKey && e.code === 'Tab') {
			e.preventDefault();
			elemLast.focus();
		}
	}

	function onLastElemKeydown(e: KeyboardEvent): void {
		if (!e.shiftKey && e.code === 'Tab') {
			e.preventDefault();
			elemFirst.focus();
		}
	}

	const onScanElements = (fromObserver: boolean) => {
		if (enabled === false) return;

		const focusableElems: HTMLElement[] = Array.from(node.querySelectorAll(elemWhitelist.join(', ')));
		if (focusableElems.length) {
			elemFirst = focusableElems[0];
			elemLast = focusableElems[focusableElems.length - 1];

			if (!fromObserver) elemFirst.focus();

			elemFirst.addEventListener('keydown', onFirstElemKeydown);
			elemLast.addEventListener('keydown', onLastElemKeydown);
		}
	};
	onScanElements(false);

	function onCleanUp(): void {
		if (elemFirst) elemFirst.removeEventListener('keydown', onFirstElemKeydown);
		if (elemLast) elemLast.removeEventListener('keydown', onLastElemKeydown);
	}

	const onObservationChange = (mutationRecords: MutationRecord[], observer: MutationObserver) => {
		if (mutationRecords.length) {
			onCleanUp();
			onScanElements(true);
		}
		return observer;
	};
	const observer = new MutationObserver(onObservationChange);
	observer.observe(node, { childList: true, subtree: true });

	return {
		update(newArgs: boolean) {
			enabled = newArgs;
			newArgs ? onScanElements(false) : onCleanUp();
		},
		destroy() {
			onCleanUp();
			observer.disconnect();
		}
	};
}
