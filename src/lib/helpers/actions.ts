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
	let isHovering = false;

	const hoverEnterHandler = () => (isHovering = true);
	const hoverLeaveHandler = () => (isHovering = false);

	const onKeyDown = (e: KeyboardEvent) => {
		if (isHovering && codes.includes(e.code)) {
			e.preventDefault();
			callback();
		}
	};

	node.addEventListener('mouseenter', hoverEnterHandler);
	node.addEventListener('mouseleave', hoverLeaveHandler);
	window.addEventListener('keydown', onKeyDown);

	return {
		destroy() {
			node.removeEventListener('mouseenter', hoverEnterHandler);
			node.removeEventListener('mouseleave', hoverLeaveHandler);
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
