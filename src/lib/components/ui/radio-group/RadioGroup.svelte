<script lang="ts">
	import { cn } from '$lib/helpers/utils';
	import { createState, createKeyboardNavigation } from '$lib/helpers/state';
	import { createEventDispatcher, setContext } from 'svelte';
	import { get, writable, type Writable } from 'svelte/store';

	const dispatch = createEventDispatcher<{ valueChange: string }>();

	let className: string | undefined | null = undefined;
	export { className as class };
	export let defaultValue: string | undefined = undefined;
	export let disabled: boolean = false;

	let value: string;
	let hasValue: Writable<boolean> = writable(false);
	let {
		methods: { init, toggle },
		variables: { values, items, activeIndex }
	} = createState(defaultValue, select);
	const onKeyDown = (e: KeyboardEvent) => createKeyboardNavigation(e, toggle, activeIndex, items.length, 'both');

	setContext('radio-group', { disabled, hasValue, init });

	function select(index: number) {
		items.forEach((item) => item.set(false));
		items[index].set(true);
		hasValue.set(true);

		value = get(values[index]);
		dispatch('valueChange', value);
	}
</script>

<div on:keydown={onKeyDown} role="radiogroup" aria-required="false" dir="ltr" tabindex="-1" class={cn('grid gap-2 outline-none', className)}>
	<slot />
</div>
