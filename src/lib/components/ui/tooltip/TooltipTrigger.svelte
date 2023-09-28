<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	let { tooltipTriggerStore, isHovering }: { tooltipTriggerStore: Writable<HTMLElement>; isHovering: Writable<boolean> } = getContext('tooltip');
</script>

<svelte:window on:scroll={() => ($isHovering = false)} />

<button bind:this={$tooltipTriggerStore} on:mouseenter={() => ($isHovering = true)} on:mouseleave={() => ($isHovering = false)}>
	<slot />
</button>
