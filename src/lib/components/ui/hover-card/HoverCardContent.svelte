<script lang="ts">
	import { cn } from '$lib/helpers/utils';
	import { createAnimationEnd, delayValue } from '$lib/helpers/state';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	let className: string | undefined | null = undefined;
	export { className as class };

	let { x, y }: { x: number; y: number } = { x: 0, y: 0 };
	let hoverCardContent: HTMLDivElement;

	let { hoverCardTriggerStore, isHoveringStore }: { hoverCardTriggerStore: Writable<HTMLElement>; isHoveringStore: Writable<boolean> } = getContext('hovercard');
	let [finishedAnimation, onAnimationEnd] = createAnimationEnd(isHoveringStore);
	let delayedIsHovering = delayValue(isHoveringStore, false);

	$: if ($hoverCardTriggerStore && hoverCardContent) calculatePosition();

	function calculatePosition() {
		x = $hoverCardTriggerStore.getBoundingClientRect().x - hoverCardContent.getBoundingClientRect().width / 2 + $hoverCardTriggerStore.getBoundingClientRect().width / 2;
		y = $hoverCardTriggerStore.getBoundingClientRect().y + 40;
	}
</script>

<svelte:window on:scroll={calculatePosition} />

{#if $delayedIsHovering || !$finishedAnimation}
	<div bind:this={hoverCardContent} style="transform: translate({x}px, {y}px);" class="fixed left-0 top-0 z-50 min-w-max will-change-transform">
		<div
			on:animationend={onAnimationEnd}
			data-side="bottom"
			data-align="center"
			data-state={$delayedIsHovering ? 'open' : 'closed'}
			class={cn(
				'z-50 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
				className
			)}
		>
			<slot />
		</div>
	</div>
{/if}
