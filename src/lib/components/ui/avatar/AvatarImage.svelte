<script lang="ts">
	import { createEventDispatcher, getContext, onMount } from 'svelte';
	import type { Writable } from 'svelte/store';
	import type { AvatarLoadingtatus } from '.';

	const dispatch = createEventDispatcher<{ loadingStatusChange: AvatarLoadingtatus }>();

	export let src: string;
	export let alt: undefined | string = undefined;

	let imageLoadingStatus: Writable<AvatarLoadingtatus> = getContext('avatar');

	$: dispatch('loadingStatusChange', $imageLoadingStatus);

	onMount(() => {
		imageLoadingStatus.set('loading');
		const img = new Image();
		img.src = src;
		img.onload = () => imageLoadingStatus.set('loaded');
		img.onerror = () => imageLoadingStatus.set('error');
	});
</script>

{#if $imageLoadingStatus === 'loaded'}
	<img {src} {alt} class="aspect-square h-full w-full" />
{/if}
