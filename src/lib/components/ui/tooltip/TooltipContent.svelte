<script lang="ts">
	import type { Align, Side } from '$lib/helpers/types';
	import { cn, isInsideElement, isNearElement, getPosition } from '$lib/helpers/utils';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import type { TooltipState } from '.';
	import { createAnimationEnd } from '$lib/helpers/state';

	let className: string | undefined | null = undefined;
	export { className as class };
	export let side: Side = 'top';
	export let align: Align = 'center';
	export let sideOffset: number = 0;
	export let alignOffset: number = 0;

	let tooltipContent: HTMLElement;

	let { tooltipTrigger, isOpen, tooltipState }: { tooltipTrigger: Writable<HTMLElement>; isOpen: Writable<boolean>; tooltipState: Writable<TooltipState> } = getContext('tooltip');
	let { disableHoverableContent, mouseEvent }: { disableHoverableContent: boolean; mouseEvent: Writable<MouseEvent> } = getContext('tooltip-provider');
	let [finishedAnimation, onAnimationEnd] = createAnimationEnd(isOpen);

	function close(mouseEvent: MouseEvent) {
		const isHoveringTrigger = isInsideElement(mouseEvent, $tooltipTrigger);
		const isHoveringContent = isInsideElement(mouseEvent, tooltipContent) || isNearElement(mouseEvent, tooltipContent, side, sideOffset);
		if (isHoveringTrigger || (isHoveringContent && !disableHoverableContent)) {
			return;
		}

		isOpen.set(false);
	}

	$: position = getPosition($tooltipTrigger, tooltipContent, side, align, sideOffset, alignOffset);
	$: $isOpen && close($mouseEvent);
</script>

{#if $isOpen || !$finishedAnimation}
	<div bind:this={tooltipContent} style="transform: translate({position?.x}px, {position?.y}px);" class="fixed left-0 top-0 z-50 min-w-max will-change-transform">
		<div
			on:animationend={onAnimationEnd}
			data-side={side}
			data-align={align}
			data-state={$tooltipState}
			class={cn(
				'z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
				className
			)}
		>
			<slot />
			<span role="tooltip" class="clip-[rect(0px,0px,0px,0px)] overflow-wrap-[normal] absolute -m-[1px] h-[1px] w-[1px] overflow-hidden whitespace-nowrap border-0 p-0">
				<slot />
			</span>
		</div>
	</div>
{/if}
