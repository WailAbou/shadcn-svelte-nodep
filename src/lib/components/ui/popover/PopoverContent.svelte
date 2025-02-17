<script lang="ts">
	import { cn, getPosition } from '$lib/helpers/utils';
	import { createAnimationEnd } from '$lib/helpers/state';
	import { getContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import type { Align, Side } from '$lib/helpers/types';
	import { clickOutside, dynamicSide, focusTrap } from '$lib/helpers/actions';

	let className: string | undefined | null = undefined;
	export { className as class };
	export let sideStatic: Side = 'bottom';
	export { sideStatic as side };
	export let align: Align = 'center';
	export let sideOffset: number = 0;
	export let alignOffset: number = 0;

	let popoverContent: HTMLDivElement;
	let side: Writable<Side> = writable(sideStatic);

	let { isOpen, popoverTrigger }: { isOpen: Writable<boolean>; popoverTrigger: Writable<HTMLElement> } = getContext('popover');
	let [finishedAnimation, onAnimationEnd] = createAnimationEnd(isOpen);

	$: position = getPosition($popoverTrigger, popoverContent, $side, align, sideOffset, alignOffset);
</script>

<svelte:window on:scroll={() => (position = getPosition($popoverTrigger, popoverContent, $side, align, sideOffset, alignOffset))} />

{#if $isOpen || !$finishedAnimation}
	<div
		bind:this={popoverContent}
		use:dynamicSide={side}
		use:clickOutside={[() => isOpen.set(false), $popoverTrigger]}
		style="transform: translate({position?.x}px, {position?.y}px);"
		class="fixed left-0 top-0 z-50 min-w-max will-change-transform"
	>
		<div
			use:focusTrap
			on:animationend={onAnimationEnd}
			data-side={side}
			data-align={align}
			data-state={$isOpen ? 'open' : 'closed'}
			role="dialog"
			tabindex="-1"
			class={cn(
				'z-50 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
				className
			)}
		>
			<slot />
		</div>
	</div>
{/if}
