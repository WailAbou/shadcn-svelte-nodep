<script lang="ts">
	import { setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import type { AvatarLoadingtatus } from '.';

	let imageLoadingStatusStore: Writable<AvatarLoadingtatus> = writable('idle');

	setContext('avatar', imageLoadingStatusStore);
</script>

<span class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
	<slot />
</span>
