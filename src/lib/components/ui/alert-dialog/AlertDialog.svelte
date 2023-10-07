<script lang="ts">
	import { keyDown, preventScroll } from '$lib/helpers/actions';
	import { createEventDispatcher, setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	const dispatch = createEventDispatcher<{ openChange: boolean }>();

	export let defaultOpen: boolean = false;
	export let open: boolean = false;

	if (defaultOpen) open = true;
	let isOpen: Writable<boolean> = writable(open);

	$: $isOpen = open;
	$: dispatch('openChange', $isOpen);

	setContext('alert-dialog', isOpen);
</script>

<svelte:window use:preventScroll={$isOpen} use:keyDown={[() => isOpen.set(false), ['Escape']]} />
<slot />
