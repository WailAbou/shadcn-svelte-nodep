<script lang="ts">
	import { setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	let tooltipTrigger: Writable<HTMLElement> = writable();
	let isOpen: Writable<boolean> = writable(false);

	setContext('tooltip', { tooltipTrigger, isOpen });
</script>

<svelte:window on:scroll={() => ($isOpen = false)} />

<slot />
