<script lang="ts">
	import { cn, delayValue, getPosition } from '$lib/helpers/utils';
	import { createAnimationEnd } from '$lib/helpers/state';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import type { Align, Side } from '$lib/helpers/types';

	let className: string | undefined | null = undefined;
	export { className as class };
	export let side: Side = 'bottom';
	export let align: Align = 'center';
	export let sideOffset: number = 0;
	export let alignOffset: number = 0;

	let { hoverCardTrigger, hoverCount, isOpen }: { hoverCardTrigger: Writable<HTMLElement>; hoverCount: Writable<number>; isOpen: Writable<boolean> } = getContext('hover-card');

	let hoverCardContent: HTMLDivElement;
	let [finishedAnimation, onAnimationEnd] = createAnimationEnd(isOpen);

	$: position = getPosition($hoverCardTrigger, hoverCardContent, side, align, sideOffset, alignOffset);
</script>

<svelte:window on:scroll={() => (position = getPosition($hoverCardTrigger, hoverCardContent, side, align, sideOffset, alignOffset))} />

{#if $isOpen || !$finishedAnimation}
	<div
		bind:this={hoverCardContent}
		on:mouseenter={() => hoverCount.update((hc) => hc + 1)}
		on:mouseleave={() => hoverCount.update((hc) => hc - 1)}
		style="transform: translate({position?.x}px, {position?.y}px);"
		class="fixed left-0 top-0 z-50 min-w-max will-change-transform"
	>
		<div
			on:animationend={onAnimationEnd}
			data-side={side}
			data-align={align}
			data-state={$isOpen ? 'open' : 'closed'}
			class={cn(
				'z-50 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
				className
			)}
		>
			<slot />
		</div>
	</div>
{/if}
