<script lang="ts">
	import { createKeyDown } from '$lib/helpers/state';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	let hoveringTimer: number = 0;
	const onKeyDown = (e: KeyboardEvent) => createKeyDown(e, ['Space', 'Enter', 'Escape'], () => ($isOpen = false));

	let { tooltipTrigger, isOpen }: { tooltipTrigger: Writable<HTMLElement>; isOpen: Writable<boolean> } = getContext('tooltip');
	let { delayDuration }: { delayDuration: number } = getContext('tooltip-provider');

	function onMouseEnter() {
		clearTimeout(hoveringTimer);
		hoveringTimer = setTimeout(() => ($isOpen = true), delayDuration);
	}
</script>

<button
	bind:this={$tooltipTrigger}
	on:mouseenter={onMouseEnter}
	on:mouseleave={() => ($isOpen = false)}
	on:focusin={() => ($isOpen = true)}
	on:focusout={() => ($isOpen = false)}
	on:keydown={onKeyDown}
>
	<slot />
</button>
