<script lang="ts">
	import { setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import type { HoverCardState } from '.';

	export let openDelay: number = 700;
	export let closeDelay: number = 300;

	let isOpen: Writable<boolean> = writable(false);
	let hoverCardTrigger: Writable<HTMLElement> = writable();
	let hoverCardState: Writable<HoverCardState> = writable('closed');
	let mouseEvent: Writable<MouseEvent> = writable();
	let close: Writable<VoidFunction> = writable();

	setContext('hover-card', { openDelay, closeDelay, isOpen, hoverCardTrigger, hoverCardState, mouseEvent, close });
</script>

<svelte:window on:mousemove={mouseEvent.set} />

<slot />
