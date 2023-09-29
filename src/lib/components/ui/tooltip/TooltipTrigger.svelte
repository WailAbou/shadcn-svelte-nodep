<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	let hoveringTimer: number = 0;

	let { tooltipTrigger, isHovering }: { tooltipTrigger: Writable<HTMLElement>; isHovering: Writable<boolean> } = getContext('tooltip');
	let { delayDuration }: { delayDuration: number } = getContext('tooltip-provider');

	function handleHover() {
		clearTimeout(hoveringTimer);
		hoveringTimer = setTimeout(() => ($isHovering = true), delayDuration);
	}
</script>

<button bind:this={$tooltipTrigger} on:mouseenter={handleHover} on:mouseleave={() => ($isHovering = false)}>
	<slot />
</button>
