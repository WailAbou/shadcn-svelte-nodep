<script lang="ts">
	import { keyDown } from '$lib/helpers/actions';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	let { isOpen, popoverTrigger }: { isOpen: Writable<boolean>; popoverTrigger: Writable<HTMLElement> } = getContext('popover');
</script>

<button bind:this={$popoverTrigger} use:keyDown={[isOpen, () => isOpen.set(false), ['Escape']]} on:click={() => ($isOpen = !$isOpen)}>
	<slot />
</button>
