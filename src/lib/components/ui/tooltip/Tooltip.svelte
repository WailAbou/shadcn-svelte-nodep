<script lang="ts">
	import { getContext, setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import type { TooltipState } from '.';

	let { delayDuration: _delayDuration }: { delayDuration: number } = getContext('tooltip-provider');
	export let delayDuration: number = _delayDuration;

	let isOpen: Writable<boolean> = writable(false);
	let tooltipTrigger: Writable<HTMLElement> = writable();
	let tooltipState: Writable<TooltipState> = writable('closed');
	let close: Writable<VoidFunction> = writable();

	setContext('tooltip', { delayDuration, isOpen, tooltipTrigger, tooltipState, close });
</script>

<svelte:window on:scroll={() => $isOpen && $close?.()} />

<slot />
