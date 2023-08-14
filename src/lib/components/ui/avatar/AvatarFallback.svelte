<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	export let delayMs: number = 0;

	let imageLoadedStore: Writable<boolean> = getContext('avatar');
	let delayIsDone: boolean = delayMs == 0;

	setTimeout(() => (delayIsDone = true), delayMs);
</script>

{#if delayIsDone && !$imageLoadedStore}
	<span class="flex h-full w-full items-center justify-center rounded-full bg-muted">
		<slot />
	</span>
{/if}
