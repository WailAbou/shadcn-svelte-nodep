<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	let { hoverCardTrigger, isHovering }: { hoverCardTrigger: Writable<HTMLElement>; isHovering: Writable<boolean> } = getContext('hovercard');
</script>

<button bind:this={$hoverCardTrigger} on:mouseenter={() => ($isHovering = true)} on:mouseleave={() => ($isHovering = false)}>
	<slot />
</button>
