<script lang="ts">
	import { setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	export let openDelay: number = 700;
	export let closeDelay: number = 300;

	let hoverCardTrigger: Writable<HTMLElement> = writable();
	let hoverCount: Writable<number> = writable(0);
	let isOpen: Writable<boolean> = writable(false);

	setContext('hover-card', { openDelay, closeDelay, hoverCardTrigger, hoverCount, isOpen });
</script>

<slot />
