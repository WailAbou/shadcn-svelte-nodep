<script lang="ts">
	import { cn, hasValue, removeValue } from '$lib/helpers/utils';
	import { createInit, handleKeyboardInteraction } from '$lib/helpers/state';
	import { createEventDispatcher, setContext } from 'svelte';
	import type { AccordionType } from '.';

	const dispatch = createEventDispatcher<{ valueChange: string | string[] }>();

	let className: string | undefined | null = undefined;
	export { className as class };
	export let collapsible: boolean = false;
	export let disabled: boolean = false;
	export let defaultValue: undefined | string | string[] = undefined;
	export let type: AccordionType;

	let value: undefined | string | string[];
	let activeIndex = 0;

	const [init, values, expandedStores, accordionTriggers] = createInit(defaultValue, select, toggle);
	const handleNavigation = (event: KeyboardEvent) =>
		handleKeyboardInteraction({ event, activeIndex, max: expandedStores.length, next: focus, previous: focus, first: focus, last: focus, navDir: 'vertical' });

	setContext('accordion', { init, disabled });

	$: isSingle = type === 'single';
	$: value = isSingle ? '' : [];

	function toggle(index: number) {
		focus(index);
		select(index);
	}

	function focus(index: number) {
		accordionTriggers[index]?.focus();
		activeIndex = index;
	}

	function select(index: number) {
		const newValue = values[index];

		expandedStores.forEach((store, i) => {
			if (isSingle && i !== index) store.set(false);
		});
		expandedStores[index].update((expanded) => (collapsible ? !expanded : true));

		if (Array.isArray(value)) {
			if (!hasValue(value, newValue)) value.push(newValue);
			else if (collapsible) removeValue(value, newValue);
		} else value = newValue;

		dispatch('valueChange', value);
	}
</script>

<div on:keydown={handleNavigation} class={cn(className)}>
	<slot />
</div>
