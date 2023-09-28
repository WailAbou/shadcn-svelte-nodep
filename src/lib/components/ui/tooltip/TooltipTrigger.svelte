<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	let hoveringTimer: number = 0;

	let { tooltipTriggerStore, isHoveringStore }: { tooltipTriggerStore: Writable<HTMLElement>; isHoveringStore: Writable<boolean> } = getContext('tooltip');
	let { delayDuration }: { delayDuration: number } = getContext('tooltip-provider');

	function handleHover() {
		clearTimeout(hoveringTimer);
		hoveringTimer = setTimeout(() => ($isHoveringStore = true), delayDuration);
	}
</script>

<button bind:this={$tooltipTriggerStore} on:mouseenter={handleHover} on:mouseleave={() => ($isHoveringStore = false)}>
	<slot />
</button>
