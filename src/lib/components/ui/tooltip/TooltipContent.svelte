<script lang="ts">
	import { createAnimationEnd } from '$lib/helpers/state';
	import type { Align, Side } from '$lib/helpers/types';
	import { delayValue, getPosition } from '$lib/helpers/utils';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import type { TooltipState } from '.';

	export let side: Side = 'top';
	export let align: Align = 'center';
	export let sideOffset: number = 0;
	export let alignOffset: number = 0;

	let { tooltipTrigger, isOpen, tooltipState }: { tooltipTrigger: Writable<HTMLElement>; isOpen: Writable<boolean>; tooltipState: Writable<TooltipState> } = getContext('tooltip');

	let tooltipContent: HTMLDivElement;
	let [finishedAnimation, onAnimationEnd] = createAnimationEnd(isOpen);
	let delayedIsOpen = delayValue(isOpen, false);

	$: position = getPosition($tooltipTrigger, tooltipContent, side, align, sideOffset, alignOffset);
</script>

{#if $delayedIsOpen || !$finishedAnimation}
	<div
		bind:this={tooltipContent}
		on:mouseenter={() => ($isOpen = true)}
		on:mouseleave={() => ($isOpen = false)}
		style="transform: translate({position?.x}px, {position?.y}px);"
		class="fixed left-0 top-0 z-50 min-w-max will-change-transform"
	>
		<div
			on:animationend={onAnimationEnd}
			data-side={side}
			data-align={align}
			data-state={$tooltipState}
			class="z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
		>
			<slot />
			<span role="tooltip" class="absolute -m-[1px] h-[1px] w-[1px] overflow-hidden whitespace-nowrap p-0" style="border: 0px; clip: rect(0px, 0px, 0px, 0px); overflow-wrap: normal;">
				<slot />
			</span>
		</div>
	</div>
{/if}
