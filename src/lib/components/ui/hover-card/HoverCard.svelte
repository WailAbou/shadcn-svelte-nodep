<script lang="ts">
	import { setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	let hoverCardTriggerStore: Writable<HTMLElement> = writable();
	let isHoveringStore: Writable<boolean> = writable(false);

	setContext('hovercard', { hoverCardTriggerStore, isHoveringStore });
</script>

<slot />
