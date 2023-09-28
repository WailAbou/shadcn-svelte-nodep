<script lang="ts">
	import { setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	let tooltipTriggerStore: Writable<HTMLElement> = writable();
	let isHoveringStore: Writable<boolean> = writable(false);

	setContext('tooltip', { tooltipTriggerStore, isHoveringStore });
</script>

<svelte:window on:scroll={() => ($isHoveringStore = false)} />

<slot />
