<script lang="ts">
	import { cn, hasValue, removeValue, type InitProps } from '$lib/utils';
	import { createEventDispatcher, setContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import type { AccordionType } from '.';

	const dispatch = createEventDispatcher<{ valueChange: string | string[] }>();

	let className: string | undefined | null = undefined;
	export { className as class };
	export let collapsible: boolean = false;
	export let defaultValue: undefined | string | string[] = undefined;
	export let type: AccordionType;

	let value: undefined | string | string[];
	let expandedStores: Writable<boolean>[] = [];
	let accordionTriggers: HTMLButtonElement[] = [];
	let focusedIndex = 0;

	const focusNext = () => focus((focusedIndex + 1) % expandedStores.length);
	const focusPrevious = () => focus((focusedIndex - 1 + expandedStores.length) % expandedStores.length);
	const focusLast = () => focus(expandedStores.length - 1);
	const focusFirst = () => focus(0);

	setContext('accordion', init);

	$: isSingle = type === 'single';
	$: value = isSingle ? '' : [];

	function init(accordionTrigger: Node, { store: expandedStore, value, onInit }: InitProps<boolean>) {
		expandedStores.push(expandedStore);
		accordionTriggers.push(accordionTrigger as HTMLButtonElement);

		let index = expandedStores.length - 1;
		if (hasValue(defaultValue, value)) select(index, value);
		const toggleItem = () => toggle(index, value);

		onInit({ toggleItem, index });
	}

	function toggle(index: number, value: string) {
		focus(index);
		select(index, value);
	}

	function focus(index: number) {
		accordionTriggers[index]?.focus();
		focusedIndex = index;
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

	function onNavigate(event: KeyboardEvent): void {
		const { key } = event;
		const next: boolean = key === 'ArrowDown';
		const previous: boolean = key === 'ArrowUp';
		const last: boolean = key === 'End';
		const first: boolean = key === 'Home';

		if (next || previous || last || first) {
			event.preventDefault();

			if (next) focusNext();
			else if (previous) focusPrevious();
			else if (last) focusLast();
			else if (first) focusFirst();
		}
	}
</script>

<div on:keydown={onNavigate} class={cn(className)}>
	<slot />
</div>
