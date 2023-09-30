export function clickOutside(node: Node, { callback, except }: { callback: VoidFunction; except?: HTMLElement }) {
	const onClick = (event: MouseEvent) => {
		const target = event.target as Node;

		if (!node.contains(target) && (!except || !except.contains(target))) {
			callback();
		}
	};

	document.body.addEventListener('click', onClick);

	return {
		update(newCallback: VoidFunction, newExcept?: HTMLElement) {
			callback = newCallback;
			except = newExcept;
		},
		destroy() {
			document.body.removeEventListener('click', onClick);
		}
	};
}
