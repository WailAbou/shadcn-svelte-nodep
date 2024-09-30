<script lang="ts">
	import { writable, type Writable } from 'svelte/store';
	import { createEventDispatcher, setContext } from 'svelte';
	import { cn, hasValue, removeValue } from '$lib/helpers/utils';
	import type { VariantProps } from 'class-variance-authority';
	import type { Direction, Orientation, SelectionMode } from '$lib/helpers/types';
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

	let value: Writable<undefined | string | string[]> = writable(defaultValue);

	setContext('toggle-group', { disabled, variant, size, select, value });

	function select(newValue: string) {
		value.update((currentValue) => {
			if (type === 'multiple') {
				currentValue = Array.isArray(currentValue) ? currentValue : [];
				return hasValue(currentValue, newValue) ? removeValue(currentValue, newValue) : [...currentValue, newValue];
			} else {
				return hasValue(currentValue, newValue) ? undefined : newValue;
			}
		});

		dispatch('valueChange', $value || '');
	}
</script>

<div {dir} data-orientation={orientation} role="group" tabindex="0" class={cn('flex items-center justify-center gap-1 outline-none', { 'flex-col space-y-1': orientation === 'vertical' }, className)}>
	<slot />
</div>
