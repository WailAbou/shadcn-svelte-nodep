<script lang="ts">
	import { createKeyDown } from '$lib/helpers/state';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	const onKeyDown = (e: KeyboardEvent) => createKeyDown(e, ['Escape'], () => ($isOpen = false));

	let { popoverTrigger, isOpen }: { popoverTrigger: Writable<HTMLElement>; isOpen: Writable<boolean> } = getContext('popover');
</script>

<button bind:this={$popoverTrigger} on:click={() => ($isOpen = !$isOpen)} on:keydown={onKeyDown}>
	<slot />
</button>
