<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import type { TooltipState } from '.';
	import { keyDown } from '$lib/helpers/actions';

	let openTimer: number = 0;
	let closeTimer: number = 0;
	let skipDelay: boolean = false;

	let { tooltipTrigger, isOpen, tooltipState }: { tooltipTrigger: Writable<HTMLElement>; isOpen: Writable<boolean>; tooltipState: Writable<TooltipState> } = getContext('tooltip');
	let { delayDuration, skipDelayDuration }: { delayDuration: number; skipDelayDuration: number } = getContext('tooltip-provider');

	function delayedOpen() {
		clearTimeout(openTimer);
		openTimer = setTimeout(() => {
			$isOpen = true;
			$tooltipState = 'delayed-open';
		}, delayDuration);
	}

	function instantOpen() {
		$isOpen = true;
		$tooltipState = 'instant-open';
	}

	function close() {
		$isOpen = false;
		$tooltipState = 'closed';
		skipDelay = true;

		clearTimeout(closeTimer);
		closeTimer = setTimeout(() => (skipDelay = false), skipDelayDuration);
	}
</script>

<button
	data-state={$tooltipState}
	bind:this={$tooltipTrigger}
	use:keyDown={[close, ['Space', 'Enter', 'Escape']]}
	on:mouseenter={() => (skipDelay ? instantOpen() : delayedOpen())}
	on:mouseleave={close}
	on:focusin={instantOpen}
	on:focusout={close}
>
	<slot />
</button>
