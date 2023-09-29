<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	let hoveringTimer: number = 0;

	let { tooltipTrigger, isHovering }: { tooltipTrigger: Writable<HTMLElement>; isHovering: Writable<boolean> } = getContext('tooltip');
	let { delayDuration }: { delayDuration: number } = getContext('tooltip-provider');

	function onMouseEnter() {
		clearTimeout(hoveringTimer);
		hoveringTimer = setTimeout(() => ($isHovering = true), delayDuration);
	}

	function onKeyDown(event: KeyboardEvent) {
		const { code } = event;
		if (['Space', 'Enter', 'Escape'].includes(code)) {
			event.preventDefault();
			$isHovering = false;
		}
	}
</script>

<button
	bind:this={$tooltipTrigger}
	on:focusin={() => ($isHovering = true)}
	on:mouseenter={onMouseEnter}
	on:mouseleave={() => ($isHovering = false)}
	on:focusout={() => ($isHovering = false)}
	on:keydown={onKeyDown}
>
	<slot />
</button>
