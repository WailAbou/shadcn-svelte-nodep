<script lang="ts">
	import { preventScroll } from '$lib/helpers/actions';
	import { createInit } from '$lib/helpers/state';
	import type { Direction } from '$lib/helpers/types';
	import { cn } from '$lib/helpers/utils';
	import { setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	let className: string | undefined | null = undefined;
	export { className as class };
	export let defaultValue: string | undefined = undefined;
	export let defaultOpen: boolean = false;
	export let disabled: boolean = false;
	export let dir: Direction = 'ltr';

	let value: undefined | string | string[];
	let activeIndex = 0;
	let selectTrigger: Writable<HTMLElement> = writable();
	let isOpen: Writable<boolean> = writable(defaultOpen);
	let selectContentUuid: string = crypto.randomUUID();
	const [init, values, items, selectTriggers] = createInit(defaultValue, select, toggle);

	setContext('select', { selectTrigger, isOpen, init, defaultValue, defaultOpen, disabled, selectContentUuid, dir });

	function toggle(index: number) {
		focus(index);
		select(index);
	}

	function focus(index: number) {
		selectTriggers[index]?.focus();
		activeIndex = index;
	}

	function select(index: number) {
		items.forEach((store) => store.set(false));
		items[index].set(true);

		value = values[index];
		// dispatch('valueChange', value);
	}
</script>

<svelte:window use:preventScroll={$isOpen} />
<slot />
