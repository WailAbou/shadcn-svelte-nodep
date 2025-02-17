<script lang="ts">
	import { cn, getPosition, isHoveredOrFocused, isNearElementSide } from '$lib/helpers/utils';
	import { createAnimationEnd } from '$lib/helpers/state';
	import { getContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import type { Align, Side } from '$lib/helpers/types';
	import type { HoverCardState } from '.';
	import { dynamicSide } from '$lib/helpers/actions';

	let className: string | undefined | null = undefined;
	export { className as class };
	export let sideStatic: Side = 'bottom';
	export { sideStatic as side };
	export let align: Align = 'center';
	export let sideOffset: number = 0;
	export let alignOffset: number = 0;

	let hoverCardContent: HTMLDivElement;
	let side: Writable<Side> = writable(sideStatic);

	const {
		isOpen,
		hoverCardTrigger,
		hoverCardState,
		mouseEvent,
		close
	}: {
		isOpen: Writable<boolean>;
		hoverCardTrigger: Writable<HTMLElement>;
		hoverCardState: Writable<HoverCardState>;
		mouseEvent: Writable<MouseEvent>;
		close: Writable<VoidFunction>;
	} = getContext('hover-card');
	const [finishedAnimation, onAnimationEnd] = createAnimationEnd(isOpen);

	function closeOnIdle(mouseEvent: MouseEvent) {
		const isTriggerActive = isHoveredOrFocused(mouseEvent, $hoverCardTrigger);
		const isContentActive = isHoveredOrFocused(mouseEvent, hoverCardContent) || isNearElementSide(mouseEvent, hoverCardContent, $side, sideOffset);
		if (!isTriggerActive && !isContentActive) {
			$close?.();
		}
	}

	$: position = getPosition($hoverCardTrigger, hoverCardContent, $side, align, sideOffset, alignOffset);
	$: $isOpen && closeOnIdle($mouseEvent);
</script>

<svelte:window on:scroll={() => (position = getPosition($hoverCardTrigger, hoverCardContent, $side, align, sideOffset, alignOffset))} on:scrollend={() => closeOnIdle($mouseEvent)} />

{#if $isOpen || !$finishedAnimation}
	<div bind:this={hoverCardContent} use:dynamicSide={side} style="transform: translate({position?.x}px, {position?.y}px);" class="fixed left-0 top-0 z-50 min-w-max will-change-transform">
		<div
			on:animationend={onAnimationEnd}
			data-side={side}
			data-align={align}
			data-state={$hoverCardState}
			class={cn(
				'z-50 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
				className
			)}
		>
			<slot />
		</div>
	</div>
{/if}
