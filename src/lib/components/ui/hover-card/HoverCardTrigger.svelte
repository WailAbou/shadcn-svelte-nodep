<script lang="ts">
	import { keyDown } from '$lib/helpers/actions';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import type { HoverCardState } from '.';

	let openTimer: number = 0;

	let {
		isOpen,
		hoverCardTrigger,
		hoverCardState
	}: { openDelay: number; closeDelay: number; isOpen: Writable<boolean>; hoverCardTrigger: Writable<HTMLElement>; hoverCardState: Writable<HoverCardState> } = getContext('hover-card');

	function open() {
		$isOpen = true;
		$hoverCardState = 'open';
	}

	function close() {
		$isOpen = false;
		$hoverCardState = 'closed';
		clearTimeout(openTimer);
	}

	$: !$isOpen && close();
</script>

<button bind:this={$hoverCardTrigger} on:mouseenter={open} use:keyDown={[isOpen, close, ['Escape']]} on:focusin={open} on:focusout={close} data-state={$hoverCardState}>
	<slot />
</button>
