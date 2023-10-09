<script lang="ts">
	import { keyDown } from '$lib/helpers/actions';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	let openTimer: number = 0;
	let closeTimer: number = 0;

	let { openDelay, closeDelay, hoverCardTrigger, isOpen }: { openDelay: number; closeDelay: number; hoverCardTrigger: Writable<HTMLElement>; isOpen: Writable<boolean> } = getContext('hovercard');

	function onMouseEnter() {
		clearTimeout(openTimer);
		clearTimeout(closeTimer);
		openTimer = setTimeout(() => ($isOpen = true), openDelay);
	}

	function onMouseLeave() {
		clearTimeout(closeTimer);
		closeTimer = setTimeout(() => ($isOpen = false), closeDelay);
	}
</script>

<button bind:this={$hoverCardTrigger} use:keyDown={[isOpen, onMouseLeave, ['Escape']]} on:mouseenter={onMouseEnter} on:mouseleave={onMouseLeave} on:focusin={onMouseEnter} on:focusout={onMouseLeave}>
	<slot />
</button>
