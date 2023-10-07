import type { ActionReturn } from 'svelte/action';

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

export function keyDown(node: Node, [callback, codes]: [VoidFunction, string[]]): ActionReturn {
	const handler = (e: KeyboardEvent) => {
		if (!codes.includes(e.code)) return;
		e.preventDefault();
		callback();
	};

	window.addEventListener('keydown', handler);

	return {
		destroy() {
			window.removeEventListener('keydown', handler);
		}
	};
}

export function preventScroll(window: Window, shouldPrevent: boolean): ActionReturn<boolean> {
	const handler = (e: Event) => {
		if (shouldPrevent) e.preventDefault();
	};

	window.addEventListener('wheel', handler, { passive: false });

	return {
		update(newShouldPrevent: boolean) {
			shouldPrevent = newShouldPrevent;
		},
		destroy() {
			window.removeEventListener('keydown', handler);
		}
	};
}
