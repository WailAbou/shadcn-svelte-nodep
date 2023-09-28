<script lang="ts">
	import { setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	let tooltipTriggerStore: Writable<HTMLElement> = writable();
	let isHovering: Writable<boolean> = writable(false);

	setContext('tooltip', { tooltipTriggerStore, isHovering });
</script>

<slot />
