export function scrollOnHover(node: HTMLElement, [selectScrollView, direction]: [HTMLElement, 'up' | 'down']) {
	let scrollInterval: number;

	function startScrolling() {
		stopScrolling();
		scrollInterval = setInterval(() => {
			selectScrollView?.scrollBy({
				top: direction === 'down' ? 35 : -35,
				behavior: 'smooth'
			});
		}, 100);
	}

	function stopScrolling() {
		clearInterval(scrollInterval);
	}

	node.addEventListener('mouseenter', startScrolling);
	node.addEventListener('mouseleave', stopScrolling);

	return {
		destroy() {
			stopScrolling();
			node.removeEventListener('mouseenter', startScrolling);
			node.removeEventListener('mouseleave', stopScrolling);
		}
	};
}
