<script lang="ts">
	import { keyDown } from '$lib/helpers/actions';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	let { popoverTrigger, isOpen }: { popoverTrigger: Writable<HTMLElement>; isOpen: Writable<boolean> } = getContext('popover');
</script>

<button bind:this={$popoverTrigger} use:keyDown={[() => isOpen.set(false), ['Escape']]} on:click={() => ($isOpen = !$isOpen)}>
	<slot />
</button>
