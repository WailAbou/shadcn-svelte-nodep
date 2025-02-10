<script lang="ts">
	import { createState, createKeyboardNavigation } from '$lib/helpers/state';
	import type { Direction, Orientation, SelectionMode } from '$lib/helpers/types';
	import { cn, hasValue, removeValue } from '$lib/helpers/utils';
	import type { VariantProps } from 'class-variance-authority';
	import { createEventDispatcher, setContext } from 'svelte';
	import { get, writable, type Writable } from 'svelte/store';
	import { toggleVariants } from './toggleVariants';

	const dispatch = createEventDispatcher<{ valueChange: string | string[] }>();

	let className: string | undefined | null = undefined;
	export { className as class };
	export let type: SelectionMode = 'single';
	export let defaultValue: undefined | string | string[] = undefined;
	export let disabled: boolean = false;
	export let orientation: Orientation = 'horizontal';
	export let dir: Direction = 'ltr';
	export let variant: VariantProps<typeof toggleVariants>['variant'] = 'default';
	export let size: VariantProps<typeof toggleVariants>['size'] = 'default';
	export let rovingFocus: boolean = true;
	export let loop: boolean = true;

	let value: Writable<undefined | string | string[]> = writable(defaultValue);
	let {
		methods: { init, focus },
		variables: { values, items, activeIndex }
	} = createState(defaultValue, select);
	const onKeyDown = (e: KeyboardEvent) => rovingFocus && createKeyboardNavigation(e, focus, activeIndex, items.length, orientation, true, false, loop);

	setContext('toggle-group', { disabled, variant, size, init });

	function select(index: number) {
		const newValue = get(values[index]);

		value.update((currentValue) => {
			if (type === 'multiple') {
				currentValue = Array.isArray(currentValue) ? currentValue : [];
				return hasValue(currentValue, newValue) ? removeValue(currentValue, newValue) : [...currentValue, newValue];
			} else {
				return hasValue(currentValue, newValue) ? undefined : newValue;
			}
		});

		items.forEach((item, i) => {
			item.set(type === 'multiple' ? hasValue($value, get(values[i])) : i === index && hasValue($value, newValue));
		});

		dispatch('valueChange', $value || '');
	}
</script>

<div
	{dir}
	data-orientation={orientation}
	role="group"
	tabindex="0"
	class={cn('flex items-center justify-center gap-1 outline-none', { 'flex-col space-y-1': orientation === 'vertical' }, className)}
	on:keydown={onKeyDown}
	on:focus={() => focus($activeIndex)}
>
	<slot />
</div>
