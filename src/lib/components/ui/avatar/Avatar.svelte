<script lang="ts">
	import { setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import type { AvatarLoadingtatus } from '.';

	let imageLoadingStatus: Writable<AvatarLoadingtatus> = writable('idle');

	setContext('avatar', imageLoadingStatus);
</script>

<span class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
	<slot />
</span>
