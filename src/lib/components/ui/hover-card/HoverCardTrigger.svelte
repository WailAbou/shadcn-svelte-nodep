<script lang="ts">
	import { createKeyDown } from '$lib/helpers/state';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	let hoveringTimer: number = 0;
	const onKeyDown = (e: KeyboardEvent) => createKeyDown(e, ['Escape'], () => ($isOpen = false));

	let { hoverCardTrigger, isOpen, openDelay }: { hoverCardTrigger: Writable<HTMLElement>; isOpen: Writable<boolean>; openDelay: number } = getContext('hovercard');

	function onMouseEnter() {
		clearTimeout(hoveringTimer);
		hoveringTimer = setTimeout(() => ($isOpen = true), openDelay);
	}
</script>

<button bind:this={$hoverCardTrigger} on:mouseenter={onMouseEnter} on:mouseleave={() => ($isOpen = false)} on:focusin={onMouseEnter} on:focusout={() => ($isOpen = false)} on:keydown={onKeyDown}>
	<slot />
</button>
