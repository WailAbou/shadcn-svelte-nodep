<script lang="ts">
	import { keyDown } from '$lib/helpers/actions';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import type { HoverCardState } from '.';

	let openTimer: number;
	let closeTimer: number | undefined;
	let lastOpenTime: number = 0;

	let {
		closeDelay,
		openDelay,
		isOpen,
		hoverCardTrigger,
		hoverCardState,
		close
	}: { closeDelay: number; openDelay: number; isOpen: Writable<boolean>; hoverCardTrigger: Writable<HTMLElement>; hoverCardState: Writable<HoverCardState>; close: Writable<VoidFunction> } =
		getContext('hover-card');

	function clearTimers() {
		clearTimeout(openTimer);
		clearTimeout(closeTimer);
		closeTimer = undefined;
	}

	function delayedOpen() {
		clearTimers();
		lastOpenTime = Date.now();
		openTimer = setTimeout(() => {
			$isOpen = true;
			$hoverCardState = 'open';
		}, openDelay);
	}

	function delayedClose() {
		if (Date.now() - lastOpenTime < openDelay) {
			clearTimers();
		}
	}

	function open() {
		clearTimers();
		$isOpen = true;
		$hoverCardState = 'open';
	}

	$close = () => {
		if (closeTimer) return;

		closeTimer = setTimeout(() => {
			$hoverCardState = 'closed';
			$isOpen = false;
		}, closeDelay);
	};
</script>

<button
	bind:this={$hoverCardTrigger}
	on:mouseenter={delayedOpen}
	on:mouseleave={delayedClose}
	use:keyDown={[isOpen, $close, ['Escape']]}
	on:focusin={open}
	on:focusout={$close}
	data-state={$hoverCardState}
>
	<slot />
</button>
