<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import type { TooltipState } from '.';
	import { keyDown } from '$lib/helpers/actions';

	let openTimer: number = 0;
	let lastCloseTime = 0;

	let { delayDuration, tooltipTrigger, isOpen, tooltipState }: { delayDuration: number; tooltipTrigger: Writable<HTMLElement>; isOpen: Writable<boolean>; tooltipState: Writable<TooltipState> } =
		getContext('tooltip');
	let { skipDelayDuration }: { skipDelayDuration: number } = getContext('tooltip-provider');

	function delayedOpen() {
		clearTimeout(openTimer);
		openTimer = setTimeout(() => {
			$isOpen = true;
			$tooltipState = 'delayed-open';
		}, delayDuration);
	}

	function open() {
		$isOpen = true;
		$tooltipState = 'instant-open';
	}

	function close() {
		$isOpen = false;
		$tooltipState = 'closed';
		lastCloseTime = Date.now();
		clearTimeout(openTimer);
	}

	$: !$isOpen && close();
</script>

<button
	bind:this={$tooltipTrigger}
	use:keyDown={[isOpen, close, ['Space', 'Enter', 'Escape']]}
	on:mouseenter={() => (Date.now() - lastCloseTime <= skipDelayDuration ? open() : delayedOpen())}
	on:mouseleave={close}
	on:focusin={open}
	on:focusout={close}
	data-state={$tooltipState}
>
	<slot />
</button>
