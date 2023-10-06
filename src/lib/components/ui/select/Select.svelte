<script lang="ts">
	import { cn } from '$lib/helpers/utils';
	import { setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	let className: string | undefined | null = undefined;
	export { className as class };

	let selectTrigger: Writable<HTMLElement> = writable();
	let isOpen: Writable<boolean> = writable(false);

	setContext('select', { selectTrigger, isOpen });

	function onWheel(event: WheelEvent): void {
		if ($isOpen) event.preventDefault();
	}
</script>

<svelte:window on:wheel|nonpassive={onWheel} />
<slot />
