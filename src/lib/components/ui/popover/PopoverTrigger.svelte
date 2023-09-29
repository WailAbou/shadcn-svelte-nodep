<script lang="ts">
	import { clickOutside } from '$lib/helpers/actions';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	let { hoverCardTrigger, isHovering }: { hoverCardTrigger: Writable<HTMLElement>; isHovering: Writable<boolean> } = getContext('hovercard');
</script>

<button bind:this={$hoverCardTrigger} on:click={() => ($isHovering = !$isHovering)} use:clickOutside={() => ($isHovering = false)}>
	<slot />
</button>
