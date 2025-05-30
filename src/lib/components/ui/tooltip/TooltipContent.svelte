<script lang="ts">
	import type { Align, Side } from '$lib/helpers/types';
	import { cn, isHoveredOrFocused, isNearElementSide, getPosition } from '$lib/helpers/utils';
	import { getContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import type { TooltipState } from '.';
	import { createAnimationEnd } from '$lib/helpers/state';
	import { dynamicSide } from '$lib/helpers/actions';

	let className: string | undefined | null = undefined;
	export { className as class };
	export let sideStatic: Side = 'top';
	export { sideStatic as side };
	export let align: Align = 'center';
	export let sideOffset: number = 0;
	export let alignOffset: number = 0;

	let tooltipContent: HTMLElement;
	let side: Writable<Side> = writable(sideStatic);

	let { tooltipTrigger, isOpen, tooltipState, close }: { tooltipTrigger: Writable<HTMLElement>; isOpen: Writable<boolean>; tooltipState: Writable<TooltipState>; close: Writable<VoidFunction> } =
		getContext('tooltip');
	let { disableHoverableContent, mouseEvent }: { disableHoverableContent: boolean; mouseEvent: Writable<MouseEvent> } = getContext('tooltip-provider');
	let [finishedAnimation, onAnimationEnd] = createAnimationEnd(isOpen);

	function closeOnIdle(mouseEvent: MouseEvent) {
		const isTriggerActive = isHoveredOrFocused(mouseEvent, $tooltipTrigger);
		const isContentActive = isHoveredOrFocused(mouseEvent, tooltipContent) || isNearElementSide(mouseEvent, tooltipContent, $side, sideOffset);
		if (!isTriggerActive && (!isContentActive || disableHoverableContent)) {
			$close?.();
		}
	}

	$: position = getPosition($tooltipTrigger, tooltipContent, $side, align, sideOffset, alignOffset);
	$: $isOpen && closeOnIdle($mouseEvent);
</script>

{#if $isOpen || !$finishedAnimation}
	<div bind:this={tooltipContent} use:dynamicSide={side} style="transform: translate({position?.x}px, {position?.y}px);" class="fixed left-0 top-0 z-50 min-w-max will-change-transform">
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
