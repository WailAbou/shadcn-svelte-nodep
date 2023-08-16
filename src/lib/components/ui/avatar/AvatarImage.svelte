<script lang="ts">
	import { createEventDispatcher, getContext, onMount } from 'svelte';
	import type { Writable } from 'svelte/store';
	import type { AvatarLoadingtatus } from '.';

	const dispatch = createEventDispatcher<{ loadingStatusChange: AvatarLoadingtatus }>();

	export let src: string;
	export let alt: undefined | string = undefined;

	let imageLoadingStatusStore: Writable<AvatarLoadingtatus> = getContext('avatar');

	$: dispatch('loadingStatusChange', $imageLoadingStatusStore);

	onMount(() => {
		imageLoadingStatusStore.set('loading');
		const img = new Image();
		img.src = src;
		img.onload = () => imageLoadingStatusStore.set('loaded');
		img.onerror = () => imageLoadingStatusStore.set('error');
	});
</script>

{#if $imageLoadingStatusStore === 'loaded'}
	<img {src} {alt} class="aspect-square h-full w-full" />
{/if}
