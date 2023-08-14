<script lang="ts">
	import { setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	let imageLoadedStore: Writable<boolean> = writable();

	setContext('avatar', imageLoadedStore);
</script>

<span class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
	<slot />
</span>
