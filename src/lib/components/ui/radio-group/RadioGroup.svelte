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
	let activeIndex = 0;

	const [init, values, checkeds, radioButtons] = createInit(defaultValue, select, toggle);
	const onKeyDown = (event: KeyboardEvent) => createKeyboardNavigation({ event, activeIndex, max: checkeds.length, next: toggle, previous: toggle });

	setContext('radio-group', { disabled, defaultValue, init });

	function toggle(index: number) {
		focus(index);
		select(index);
	}

	function focus(index: number) {
		radioButtons[index]?.focus();
		activeIndex = index;
	}

	function select(index: number) {
		checkeds.forEach((store) => store.set(false));
		checkeds[index].set(true);

		value = values[index];
		dispatch('valueChange', value);
	}
</script>

<div on:keydown={onKeyDown} role="radiogroup" aria-required="false" dir="ltr" tabindex="-1" class={cn('grid gap-2 outline-none', className)}>
	<slot />
</div>
