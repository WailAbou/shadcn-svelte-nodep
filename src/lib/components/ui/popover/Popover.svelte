<script lang="ts">
	import { setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	let popoverTrigger: Writable<HTMLElement> = writable();
	let isOpen: Writable<boolean> = writable(false);

	setContext('popover', { popoverTrigger, isOpen });
</script>

<slot />
