<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	let { hoverCardTriggerStore, isHoveringStore }: { hoverCardTriggerStore: Writable<HTMLElement>; isHoveringStore: Writable<boolean> } = getContext('hovercard');
</script>

<button bind:this={$hoverCardTriggerStore} on:mouseenter={() => ($isHoveringStore = true)} on:mouseleave={() => ($isHoveringStore = false)}>
	<slot />
</button>
