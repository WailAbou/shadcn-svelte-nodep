<script lang="ts">
	import { cn } from '$lib/helpers/utils';
	import { onMount, afterUpdate } from 'svelte';

	let className: string | undefined | null = undefined;
	export { className as class };

	// let scrollAreaHeight = 0;
	// let scrollbarHeight = 0;

	// let isDragging = false;
	// let initialMouseY = 0;
	// let initialScrollbarY = 0;

	// let scrollbarY = 0;
	// let init = false;

	let scrollArea: HTMLDivElement;
	let scrollbar: HTMLDivElement;
	let scrollBarHeight = 40;
	let scrollHeight = 0;

	const updateScrollbarHeight = () => {
		let max = scrollArea.scrollHeight - scrollArea.clientHeight;
		let percentage = scrollArea.scrollTop / max;
		scrollHeight = percentage * (scrollArea.clientHeight - scrollBarHeight);
	};

	// onMount(() => {
	// 	updateScrollbarHeight();
	// 	window.addEventListener('resize', updateScrollbarHeight);
	// 	init = true;
	// });

	// afterUpdate(() => {
	// 	updateScrollbarHeight();
	// });

	// const handleMouseDown = (event: MouseEvent) => {
	// 	isDragging = true;
	// 	initialMouseY = event.clientY;
	// 	initialScrollbarY = scrollbarY;
	// };

	// const handleMouseMove = (event: MouseEvent) => {
	// 	if (isDragging) {
	// 		const deltaY = event.clientY - initialMouseY;
	// 		scrollbarY = Math.max(0, Math.min(initialScrollbarY + deltaY, scrollAreaHeight - scrollbarHeight));
	// 	}
	// };

	// const handleMouseUp = () => {
	// 	isDragging = false;
	// };

	// const handleMouseLeave = () => {
	// 	isDragging = false;
	// };

	// $: {
	// 	if (init) {
	// 		const scrollArea = document.querySelector('[data-scroll-area-viewport]');
	// 		if (scrollArea) {
	// 			scrollArea.scrollTop = (scrollbarY / scrollAreaHeight) * scrollArea.scrollHeight;
	// 		}
	// 	}
	// }
</script>

<div dir="ltr" class={cn('relative overflow-hidden', className)}>
	<div bind:this={scrollArea} class="h-full w-full overflow-x-hidden overflow-y-scroll rounded-[inherit]" data-scroll-area-viewport on:scroll={updateScrollbarHeight}>
		<div style="min-width: 100%; display: table;">
			<slot />
		</div>
	</div>
	<!-- <div
		data-orientation="vertical"
		data-state="visible"
		class="absolute right-0 top-0 flex h-full w-2.5 touch-none select-none border-l border-l-transparent p-[1px] transition-colors"
		style="bottom: {0};transform: translateY({scrollbarY}px);"
		on:mousedown={handleMouseDown}
		on:mousemove={handleMouseMove}
		on:mouseup={handleMouseUp}
		on:mouseleave={handleMouseLeave}
	>
		<div data-state="visible" class="relative flex-1 rounded-full bg-border" style="height: {scrollbarHeight}px;"></div>
	</div> -->
	<div
		bind:this={scrollbar}
		data-orientation="vertical"
		data-state="visible"
		class="absolute right-0 top-0 flex h-full w-2.5 touch-none select-none border-l border-l-transparent p-[1px] transition-colors"
	>
		<div data-state="visible" class="relative flex-1 rounded-full bg-border" style="height: {scrollBarHeight}px; transform: translate3d(0px, {scrollHeight}px, 0px);"></div>
	</div>
</div>

<style>
	[data-scroll-area-viewport] {
		scrollbar-width: none;
		-ms-overflow-style: none;
		-webkit-overflow-scrolling: touch;
	}
	[data-scroll-area-viewport]::-webkit-scrollbar {
		display: none;
	}
</style>