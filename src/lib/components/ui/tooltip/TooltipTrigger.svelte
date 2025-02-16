<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import type { TooltipState } from '.';
	import { keyDown } from '$lib/helpers/actions';

	let openTimer: number = 0;
	let lastCloseTime: number = 0;
	let lastOpenTime: number = 0;

	let {
		delayDuration,
		tooltipTrigger,
		isOpen,
		tooltipState,
		close
	}: { delayDuration: number; tooltipTrigger: Writable<HTMLElement>; isOpen: Writable<boolean>; tooltipState: Writable<TooltipState>; close: Writable<VoidFunction> } = getContext('tooltip');
	let { skipDelayDuration }: { skipDelayDuration: number } = getContext('tooltip-provider');

	function delayedOpen() {
		clearTimeout(openTimer);
		lastOpenTime = Date.now();
		openTimer = setTimeout(() => {
			$isOpen = true;
			$tooltipState = 'delayed-open';
		}, delayDuration);
	}

	function delayedClose() {
		if (Date.now() - lastOpenTime < delayDuration) {
			clearTimeout(openTimer);
		}
	}

	function open() {
		setTimeout(() => {
			$isOpen = true;
			$tooltipState = 'instant-open';
		}, 1);
	}

	$close = () => {
		$isOpen = false;
		$tooltipState = 'closed';
		lastCloseTime = Date.now();
		clearTimeout(openTimer);
	};
</script>

<button
	bind:this={$tooltipTrigger}
	use:keyDown={[isOpen, $close, ['Space', 'Enter', 'Escape']]}
	on:mouseenter={() => (Date.now() - lastCloseTime <= skipDelayDuration ? open() : delayedOpen())}
	on:mouseleave={delayedClose}
	on:focusin={open}
	on:focusout={$close}
	data-state={$tooltipState}
>
	<slot />
</button>
