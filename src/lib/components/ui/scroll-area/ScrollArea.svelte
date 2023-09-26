<script lang="ts">
	import { cn } from '$lib/helpers/utils';
	import type { ScrollAreaType } from '.';

	let className: string | undefined | null = undefined;
	export { className as class };
	export let type: ScrollAreaType = 'hover';
	export let scrollHideDelay: number = 600;

	let scrollArea: HTMLDivElement;
	let scrollBar: HTMLDivElement;
	let scrollBarHeight = 40;
	let scrollHeight = 0;
	let isDragging = false;
	let hideScrollBar = false;
	let hoveringOver = false;
	let scrolling = false;
	let scrollingTimer: number;

	$: scrollAreaMax = scrollArea?.scrollHeight - scrollArea?.clientHeight;
	$: scrollBarMax = scrollArea?.clientHeight - scrollBarHeight;
	$: scrollBarStartY = scrollBar?.getBoundingClientRect().y + scrollBarHeight / 2;
	$: if (type == 'auto' && scrollAreaMax < scrollBarMax) hideScrollBar = true;
	$: showScrollBar = type == 'always' || (type == 'hover' && hoveringOver) || (type == 'auto' && !hideScrollBar) || (type == 'scroll' && hoveringOver && scrolling);
	const syncScrollBarToArea = () => {
		const percentage = scrollArea.scrollTop / scrollAreaMax;
		scrollHeight = percentage * scrollBarMax;
		handleScroll();
	};

	const syncAreaToScrollBar = (event: MouseEvent) => {
		if (isDragging) {
			const relativeY = event.clientY - scrollBarStartY;
			const percentage = relativeY / scrollBarMax;
			scrollArea.scrollTop = percentage * scrollAreaMax;
			handleScroll();
		}
	};

	const handleScroll = () => {
		scrolling = true;
		if (scrollingTimer) clearTimeout(scrollingTimer);
		scrollingTimer = setTimeout(() => (scrolling = false), scrollHideDelay);
	};
</script>

<svelte:window on:mouseup={() => (isDragging = false)} on:mousemove={syncAreaToScrollBar} />

<div dir="ltr" class={cn('relative overflow-hidden', className)} on:mouseover={() => (hoveringOver = true)} on:mouseleave={() => (hoveringOver = false)}>
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
			<div data-state="visible" class="relative flex-1 rounded-full bg-border" style="height: {scrollBarHeight}px; transform: translate3d(0px, {scrollHeight}px, 0px);"></div>
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
