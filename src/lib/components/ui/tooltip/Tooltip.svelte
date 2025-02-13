<script lang="ts">
	import { getContext, setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import type { TooltipState } from '.';

	let { delayDuration: _delayDuration }: { delayDuration: number } = getContext('tooltip-provider');
	export let delayDuration: number = _delayDuration;

	let isOpen: Writable<boolean> = writable(false);
	let tooltipTrigger: Writable<HTMLElement> = writable();
	let tooltipState: Writable<TooltipState> = writable('closed');

	setContext('tooltip', { delayDuration, isOpen, tooltipTrigger, tooltipState });
</script>

<svelte:window on:scroll={() => isOpen.set(false)} />

<slot />
