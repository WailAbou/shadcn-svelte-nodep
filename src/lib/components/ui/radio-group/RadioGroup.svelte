<script lang="ts">
	import { cn } from '$lib/helpers/utils';
	import { createInit, createKeyboardNavigation } from '$lib/helpers/state';
	import { createEventDispatcher, setContext } from 'svelte';

	const dispatch = createEventDispatcher<{ valueChange: string }>();

	let className: string | undefined | null = undefined;
	export { className as class };
	export let defaultValue: string | undefined = undefined;
	export let disabled: boolean = false;

	let value: string;
	let {
		methods: { init, toggle },
		values: { allValues, items, activeIndex }
	} = createInit(defaultValue, select);
	const onKeyDown = (e: KeyboardEvent) => createKeyboardNavigation(e, toggle, $activeIndex, items.length, 'both');

	setContext('radio-group', { disabled, defaultValue, init });

	function select(index: number) {
		items.forEach((item) => item.set(false));
		items[index].set(true);

		value = allValues[index];
		dispatch('valueChange', value);
	}
</script>

<div on:keydown={onKeyDown} role="radiogroup" aria-required="false" dir="ltr" tabindex="-1" class={cn('grid gap-2 outline-none', className)}>
	<slot />
</div>
