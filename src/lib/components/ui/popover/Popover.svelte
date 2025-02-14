<script lang="ts">
	import { setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	let isOpen: Writable<boolean> = writable(false);
	let popoverTrigger: Writable<HTMLElement> = writable();

	setContext('popover', { isOpen, popoverTrigger });
</script>

<slot />
