<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import type { AvatarLoadingtatus } from '.';

	export let delayMs: number = 0;

	let imageLoadingStatus$: Writable<AvatarLoadingtatus> = getContext('avatar');
	let delayDone: boolean = delayMs == 0;

	setTimeout(() => (delayDone = true), delayMs);

	$: showFallback = delayDone && $imageLoadingStatus$ !== 'loaded';
</script>

{#if showFallback}
	<span class="flex h-full w-full items-center justify-center rounded-full bg-muted">
		<slot />
	</span>
{/if}
