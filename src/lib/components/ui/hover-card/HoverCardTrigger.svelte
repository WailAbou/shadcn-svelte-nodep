<script lang="ts">
	import { keyDown } from '$lib/helpers/actions';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	let openTimer: number = 0;
	let closeTimer: number = 0;

	let {
		openDelay,
		closeDelay,
		hoverCardTrigger,
		hoverCount,
		isOpen
	}: { openDelay: number; closeDelay: number; hoverCardTrigger: Writable<HTMLElement>; hoverCount: Writable<number>; isOpen: Writable<boolean> } = getContext('hover-card');

	$: $hoverCount > 0 && !$isOpen ? open() : close();

	function open() {
		clearTimeout(openTimer);
		openTimer = setTimeout(() => {
			if ($hoverCount > 0) isOpen.set(true);
		}, openDelay);
	}

	function close() {
		clearTimeout(closeTimer);
		closeTimer = setTimeout(() => {
			if ($hoverCount == 0) isOpen.set(false);
		}, closeDelay);
	}
</script>

<button
	bind:this={$hoverCardTrigger}
	use:keyDown={[isOpen, close, ['Escape']]}
	on:mouseenter={() => hoverCount.update((hc) => hc + 1)}
	on:mouseleave={() => hoverCount.update((hc) => hc - 1)}
	on:focusin={() => hoverCount.update((hc) => hc + 1)}
	on:focusout={() => hoverCount.update((hc) => hc - 1)}
>
	<slot />
</button>
