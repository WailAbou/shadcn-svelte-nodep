<script lang="ts">
	import { cn, hasValue } from '$lib/helpers/utils';
	import type { VariantProps } from 'class-variance-authority';
	import { createEventDispatcher, getContext } from 'svelte';
	import { toggleVariants } from './toggleVariants';
	import type { Writable } from 'svelte/store';

	const dispatch = createEventDispatcher<{ pressedChange: boolean }>();

	let className: string | undefined | null = undefined;
	export { className as class };
	export let value: string;
	export let ariaLabel: string;
	export let defaultPressed: boolean = false;
	export let pressed: boolean = false;

	pressed = defaultPressed;

	let {
		disabled,
		variant,
		size,
		select,
		value: selectedValue
	}: {
		disabled: boolean;
		variant: VariantProps<typeof toggleVariants>['variant'];
		size: VariantProps<typeof toggleVariants>['size'];
		select: (newValue: string) => void;
		value: Writable<undefined | string | string[]>;
	} = getContext('toggle-group');

	$: pressed = hasValue($selectedValue, value);
	$: dispatch('pressedChange', pressed);
</script>

<button
	{disabled}
	aria-pressed={pressed}
	data-state={pressed ? 'on' : 'off'}
	aria-label={ariaLabel}
	data-disabled={disabled ? true : undefined}
	type="button"
	class={cn(
		'inline-flex h-10 items-center justify-center rounded-md bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground',
		toggleVariants({ variant, size, className })
	)}
	on:click={() => select(value)}
>
	<slot />
</button>
