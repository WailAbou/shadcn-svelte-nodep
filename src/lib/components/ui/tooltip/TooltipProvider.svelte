<script lang="ts">
	import { setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	export let delayDuration: number = 700;
	export let skipDelayDuration: number = 300;
	export let disableHoverableContent: boolean = false;

	let mouseEvent: Writable<MouseEvent | null> = writable(null);

	setContext('tooltip-provider', { delayDuration, skipDelayDuration, disableHoverableContent, mouseEvent });
</script>

<svelte:window on:mousemove={mouseEvent.set} />

<slot />
