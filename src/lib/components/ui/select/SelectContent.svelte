<script lang="ts">
	import { createAnimationEnd } from '$lib/helpers/state';
	import type { Align, Side } from '$lib/helpers/types';
	import { cn, getPosition } from '$lib/helpers/utils';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	let className: string | undefined | null = undefined;
	export { className as class };
	export let side: Side = 'bottom';
	export let align: Align = 'start';
	export let sideOffset: number = 0;
	export let alignOffset: number = 0;

	let { selectTrigger, isOpen, selectContentUuid, dir }: { selectTrigger: Writable<HTMLElement>; isOpen: Writable<boolean>; selectContentUuid: string; dir: string } = getContext('select');
	let [finishedAnimation, onAnimationEnd] = createAnimationEnd(isOpen);

	let selectContent: HTMLDivElement;
	$: position = getPosition($selectTrigger, selectContent, side, align, sideOffset, alignOffset);
	$: bounds = $selectTrigger?.getBoundingClientRect();
</script>

{#if $isOpen || !$finishedAnimation}
	<div bind:this={selectContent} {dir} class="fixed left-0 top-0 z-50 min-w-max will-change-transform" style="transform: translate({position?.x}px, {position?.y}px);">
		<div
			on:animationend={onAnimationEnd}
			id={selectContentUuid}
			{dir}
			data-state={$isOpen ? 'open' : 'closed'}
			data-side={side}
			data-align={align}
			role="listbox"
			tabindex="-1"
			class="pointer-events-auto relative z-50 box-border flex min-w-[8rem] flex-col overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md outline-none data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
		>
			<div data-select-viewport role="presentation" class="relative w-full flex-1 overflow-auto p-1" style="min-width: {bounds?.width}px; height: {bounds?.height};">
				<slot />
			</div>
		</div>
	</div>
{/if}

<style>
	[data-select-viewport] {
		scrollbar-width: none;
		-ms-overflow-style: none;
		-webkit-overflow-scrolling: touch;
	}
	[data-select-viewport]::-webkit-scrollbar {
		display: none;
	}
</style>
