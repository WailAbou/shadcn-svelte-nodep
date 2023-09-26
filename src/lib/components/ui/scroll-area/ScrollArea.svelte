<script lang="ts">
	import { cn } from '$lib/helpers/utils';
	import type { ScrollAreaType } from '.';

	let className: string | undefined | null = undefined;
	export { className as class };
	export let type: ScrollAreaType = 'hover';
	export let scrollHideDelay: number = 600;

	let [scrollArea, scrollBar]: HTMLDivElement[] = [];
	let [isDragging, isHovering, isScrollBarHidden, isScrolling] = [false, false, false, false];
	let [scrollingTimer, hoverTimer] = [0, 0];
	let [scrollBarHeight, scrollBarY] = [40, 0];

	$: scrollBarMinY = scrollBar?.getBoundingClientRect().y + scrollBarHeight / 2;
	$: scrollBarMaxY = scrollArea?.clientHeight - scrollBarHeight;
	$: scrollAreaMaxY = scrollArea?.scrollHeight - scrollArea?.clientHeight;
	$: if (type == 'auto' && scrollAreaMaxY < scrollBarMaxY) isScrollBarHidden = true;
	$: showScrollBar = type == 'always' || (type == 'hover' && isHovering) || (type == 'auto' && !isScrollBarHidden) || (type == 'scroll' && isScrolling);

	const syncScrollBarToArea = () => {
		const percentage = scrollArea.scrollTop / scrollAreaMaxY;
		scrollBarY = percentage * scrollBarMaxY;
		handleScroll();
	};

	const syncAreaToScrollBar = (event: MouseEvent) => {
		if (isDragging) {
			const relativeY = event.clientY - scrollBarMinY;
			const percentage = relativeY / scrollBarMaxY;
			scrollArea.scrollTop = percentage * scrollAreaMaxY;
			handleScroll();
		}
	};

	const handleScroll = () => {
		isScrolling = true;
		clearTimeout(scrollingTimer);
		scrollingTimer = setTimeout(() => (isScrolling = false), scrollHideDelay);
	};

	const handleHover = () => {
		isHovering = true;
		clearTimeout(hoverTimer);
		hoverTimer = setTimeout(() => (isHovering = false), scrollHideDelay);
	};
</script>

<svelte:window on:mousemove={syncAreaToScrollBar} on:mouseup={() => (isDragging = false)} />

<div dir="ltr" class={cn('relative overflow-hidden', className)} on:mouseover={handleHover} on:mouseleave={handleHover}>
	<div bind:this={scrollArea} on:scroll={syncScrollBarToArea} class="h-full w-full overflow-x-hidden overflow-y-scroll rounded-[inherit]" data-scroll-area-viewport>
		<div style="min-width: 100%; display: table;">
			<slot />
		</div>
	</div>
	{#if showScrollBar}
		<div
			bind:this={scrollBar}
			on:mousedown={() => (isDragging = true)}
			data-orientation="vertical"
			data-state="visible"
			class="absolute right-0 top-0 flex h-full w-2.5 touch-none select-none border-l border-l-transparent p-[1px] transition-colors"
		>
			<div data-state="visible" class="relative flex-1 rounded-full bg-border" style="height: {scrollBarHeight}px; transform: translate3d(0px, {scrollBarY}px, 0px);"></div>
		</div>
	{/if}
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
