<script lang="ts">
	import { createEventDispatcher, getContext, onMount } from 'svelte';
	import type { Writable } from 'svelte/store';

	const dispatch = createEventDispatcher<{ loadingStatusChange: boolean }>();

	export let src: string;
	export let alt: undefined | string = undefined;

	let imageLoadedStore: Writable<boolean> = getContext('avatar');

	$: dispatch('loadingStatusChange', $imageLoadedStore);

	onMount(() => {
		const img = new Image();
		img.src = src;
		img.onload = () => imageLoadedStore.set(true);
		img.onerror = () => imageLoadedStore.set(false);
	});
</script>

{#if $imageLoadedStore}
	<img {src} {alt} class="aspect-square h-full w-full" />
{/if}
