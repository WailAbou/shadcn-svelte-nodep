<script lang="ts">
	import { cn, handleKeyboardInteraction, hasValue, removeValue } from '$lib/helpers/utils';
	import type { InitProps } from '$lib/helpers/types';
	import type { AccordionType } from '.';
	import { createEventDispatcher, setContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	const dispatch = createEventDispatcher<{ valueChange: string | string[] }>();

	let className: string | undefined | null = undefined;
	export { className as class };
	export let collapsible: boolean = false;
	export let disabled: boolean = false;
	export let defaultValue: undefined | string | string[] = undefined;
	export let type: AccordionType;

	let value: undefined | string | string[];
	let expandedStores: Writable<boolean>[] = [];
	let accordionTriggers: HTMLButtonElement[] = [];
	let activeIndex = 0;

	setContext('accordion', { init, disabled });

	$: isSingle = type === 'single';
	$: value = isSingle ? '' : [];

	function init(accordionTrigger: Node, { store: expandedStore, value, initResult }: InitProps<boolean>) {
		expandedStores.push(expandedStore);
		accordionTriggers.push(accordionTrigger as HTMLButtonElement);

		let index = expandedStores.length - 1;
		if (hasValue(defaultValue, value)) select(index, value);
		const toggleItem = () => toggle(index, value);

		[initResult.toggleItem, initResult.index] = [toggleItem, index];
	}

	function toggle(index: number, value: string) {
		focus(index);
		select(index, value);
	}

	function focus(index: number) {
		accordionTriggers[index]?.focus();
		activeIndex = index;
	}

	function select(index: number, newValue: string) {
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

	const handleNavigation = (event: KeyboardEvent) =>
		handleKeyboardInteraction({ event, activeIndex, max: expandedStores.length, next: focus, previous: focus, first: focus, last: focus, navDir: 'vertical' });
</script>

<div on:keydown={handleNavigation} class={cn(className)}>
	<slot />
</div>
