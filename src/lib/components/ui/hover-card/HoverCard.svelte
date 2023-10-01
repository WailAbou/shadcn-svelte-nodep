<script lang="ts">
	import { setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	export let openDelay: number = 700;
	export let closeDelay: number = 300;

	let hoverCardTrigger: Writable<HTMLElement> = writable();
	let isOpen: Writable<boolean> = writable(false);

	setContext('hovercard', { openDelay, closeDelay, hoverCardTrigger, isOpen });
</script>

<slot />
