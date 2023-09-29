<script lang="ts">
	import { setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	let hoverCardTrigger: Writable<HTMLElement> = writable();
	let isHovering: Writable<boolean> = writable(false);

	setContext('hovercard', { hoverCardTrigger, isHovering });
</script>

<slot />
