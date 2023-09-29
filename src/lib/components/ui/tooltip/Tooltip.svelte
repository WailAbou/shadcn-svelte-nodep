<script lang="ts">
	import { setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	let tooltipTrigger: Writable<HTMLElement> = writable();
	let isHovering: Writable<boolean> = writable(false);

	setContext('tooltip', { tooltipTrigger, isHovering });
</script>

<svelte:window on:scroll={() => ($isHovering = false)} />

<slot />
