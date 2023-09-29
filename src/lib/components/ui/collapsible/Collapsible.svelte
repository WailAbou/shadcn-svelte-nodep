<script lang="ts">
	import { cn } from '$lib/helpers/utils';
	import { createEventDispatcher, setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	const dispatch = createEventDispatcher<{ openChange: boolean }>();

	let className: string | undefined | null = undefined;
	export { className as class };

	export let defaultOpen: boolean = false;
	export let disabled: boolean = false;

	let open: Writable<boolean> = writable(defaultOpen);

	setContext('collapsible', { open, disabled });

	$: dispatch('openChange', $open);
</script>

<div class={cn(className)}>
	<slot />
</div>
