<script lang="ts">
	import { setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import type { TooltipState } from '.';

	let tooltipTrigger: Writable<HTMLElement> = writable();
	let isOpen: Writable<boolean> = writable(false);
	let tooltipState: Writable<TooltipState> = writable('closed');

	setContext('tooltip', { tooltipTrigger, isOpen, tooltipState });
</script>

<svelte:window on:scroll={() => isOpen.set(false)} />
<slot />
