<script lang="ts">
	import { createState, createKeyboardNavigation } from '$lib/helpers/state';
	import type { SelectionMode } from '$lib/helpers/types';
	import { cn, hasValue, removeValue } from '$lib/helpers/utils';
	import { createEventDispatcher, setContext } from 'svelte';
	import { get } from 'svelte/store';

	const dispatch = createEventDispatcher<{ valueChange: string | string[] }>();

	let className: string | undefined | null = undefined;
	export { className as class };
	export let collapsible: boolean = false;
	export let disabled: boolean = false;
	export let defaultValue: undefined | string | string[] = undefined;
	export let type: SelectionMode;

	let value: undefined | string | string[];
	let {
		methods: { init, focus },
		variables: { values, items, activeIndex }
	} = createState(defaultValue, select);
	const onKeyDown = (e: KeyboardEvent) => createKeyboardNavigation(e, focus, activeIndex, items.length, 'vertical', true, true);

	setContext('accordion', { init, disabled });

	$: isSingle = type === 'single';
	$: value = isSingle ? '' : [];

	function select(index: number) {
		const newValue = get(values[index]);

		if (isSingle) items.filter((_, i) => i !== index).forEach((item) => item.set(false));
		items[index].update((item) => (collapsible ? !item : true));

		if (Array.isArray(value)) {
			if (!hasValue(value, newValue)) value.push(newValue);
			else if (collapsible) removeValue(value, newValue);
		} else value = newValue;

		dispatch('valueChange', value);
	}
</script>

<div on:keydown={onKeyDown} class={cn(className)}>
	<slot />
</div>
