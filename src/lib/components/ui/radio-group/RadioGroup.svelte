<script lang="ts">
	import { cn } from '$lib/helpers/utils';
	import { createInit, handleKeyboardInteraction } from '$lib/helpers/state';
	import { createEventDispatcher, setContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	const dispatch = createEventDispatcher<{ valueChange: string }>();

	let className: string | undefined | null = undefined;
	export { className as class };
	export let defaultValue: string | undefined = undefined;
	export let disabled: boolean = false;

	let value: string;
	let checkedStores: Writable<boolean>[] = [];
	let radioButtons: HTMLButtonElement[] = [];
	let activeIndex = 0;

	const init = createInit(checkedStores, radioButtons, defaultValue, select, toggle);
	const handleNavigation = (event: KeyboardEvent) => handleKeyboardInteraction({ event, activeIndex, max: checkedStores.length, next: toggle, previous: toggle });

	setContext('radio-group', { disabled, defaultValue, init });

	function toggle(index: number) {
		focus(index);
		select(index, radioButtons[index].value);
	}

	function focus(index: number) {
		radioButtons[index]?.focus();
		activeIndex = index;
	}

	function select(index: number, newValue: string) {
		checkedStores.forEach((store) => store.set(false));
		checkedStores[index].set(true);

		value = newValue;
		dispatch('valueChange', value);
	}
</script>

<div on:keydown={handleNavigation} role="radiogroup" aria-required="false" dir="ltr" tabindex="-1" class={cn('grid gap-2 outline-none', className)}>
	<slot />
</div>
