<script lang="ts">
	import { createAnimationend } from '$lib/helpers/state';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	let { x, y }: { x: number; y: number } = { x: 0, y: 0 };
	let tooltipContent: HTMLDivElement;

	let { tooltipTriggerStore, isHovering }: { tooltipTriggerStore: Writable<HTMLElement>; isHovering: Writable<boolean> } = getContext('tooltip');
	let [finishedAnimation, onAnimationend] = createAnimationend(isHovering);

	$: if ($tooltipTriggerStore && tooltipContent) {
		x = $tooltipTriggerStore.getBoundingClientRect().x - $tooltipTriggerStore.getBoundingClientRect().width / 4;
		y = $tooltipTriggerStore.getBoundingClientRect().y - tooltipContent.getBoundingClientRect().height - 5;
	}
</script>

{#if $isHovering || !$finishedAnimation}
	<div bind:this={tooltipContent} style="transform: translate({x}px, {y}px);" class="fixed left-0 top-0 z-50 min-w-max will-change-transform">
		<div
			on:animationend={onAnimationend}
			data-side="top"
			data-align="center"
			data-state={$isHovering ? 'delayed-open' : 'closed'}
			class="z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
		>
			<slot />
			<span role="tooltip" class="absolute -m-[1px] h-[1px] w-[1px] overflow-hidden whitespace-nowrap p-0" style="border: 0px; clip: rect(0px, 0px, 0px, 0px); overflow-wrap: normal;">
				<slot />
			</span>
		</div>
	</div>
{/if}
