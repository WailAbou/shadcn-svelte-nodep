<script lang="ts">
	import { createKeyDown } from '$lib/helpers/state';
	import { createEventDispatcher, setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	const dispatch = createEventDispatcher<{ openChange: boolean }>();

	export let defaultOpen: boolean = false;
	export let open: boolean = false;

	if (defaultOpen) open = true;
	let isOpen: Writable<boolean> = writable(open);
	const onKeyDown = (e: KeyboardEvent) => createKeyDown(e, ['Escape'], () => ($isOpen = false));

	$: $isOpen = open;
	$: dispatch('openChange', $isOpen);

	setContext('alert-dialog', isOpen);

	function onWheel(event: WheelEvent): void {
		if ($isOpen) event.preventDefault();
	}
</script>

<svelte:window on:wheel|nonpassive={onWheel} on:keydown={onKeyDown} />
<slot />
