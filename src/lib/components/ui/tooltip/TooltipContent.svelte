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
	<div
		bind:this={tooltipContent}
		data-radix-popper-content-wrapper=""
		style="position: fixed; left: 0px; top: 0px; transform: translate({x}px, {y}px);
    min-width: max-content; --radix-popper-transform-origin: 50% 33.3333px; will-change: transform; z-index: 50; --radix-popper-available-width: 1158px; --radix-popper-available-height: 497.66668701171875px; --radix-popper-anchor-width: 73.15625px; --radix-popper-anchor-height: 40px;"
	>
		<div
			on:animationend={onAnimationend}
			data-side="top"
			data-align="center"
			data-state={$isHovering ? 'delayed-open' : 'closed'}
			class="z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
			style="--radix-tooltip-content-transform-origin: var(--radix-popper-transform-origin); --radix-tooltip-content-available-width: var(--radix-popper-available-width); --radix-tooltip-content-available-height: var(--radix-popper-available-height); --radix-tooltip-trigger-width: var(--radix-popper-anchor-width); --radix-tooltip-trigger-height: var(--radix-popper-anchor-height);"
		>
			<slot />
			<span
				id="radix-:rj:"
				role="tooltip"
				style="position: absolute; border: 0px; width: 1px; height: 1px; padding: 0px; margin: -1px; overflow: hidden; clip: rect(0px, 0px, 0px, 0px); white-space: nowrap; overflow-wrap: normal;"
			>
				<slot />
			</span>
		</div>
	</div>
{/if}
