<script lang="ts">
	import { setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	export let openDelay: number = 700;

	let hoverCardTrigger: Writable<HTMLElement> = writable();
	let isOpen: Writable<boolean> = writable(false);

	setContext('hovercard', { hoverCardTrigger, isOpen, openDelay });
</script>

<slot />
