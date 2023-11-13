<script lang="ts">
	import { X } from 'lucide-svelte';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	let isOpen: Writable<boolean> = getContext('sheet');
</script>

<button
	on:click={() => ($isOpen = false)}
	type="button"
	class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
>
	<X class="h-4 w-4" /><span class="sr-only">Close</span>
</button>
<div class="flex flex-col space-y-2 text-center sm:text-left">
	<slot />
</div>
