<script lang="ts">
	import type { InitFunction, InitResult } from '$lib/helpers/types';
	import { cn } from '$lib/helpers/utils';
	import type { VariantProps } from 'class-variance-authority';
	import { getContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import { toggleVariants } from './toggleVariants';

	let className: string | undefined | null = undefined;
	export { className as class };
	export let value: string;
	export let ariaLabel: string;

	let focused: boolean = false;
	let isPressed: Writable<boolean> = writable(false);
	let initResult: Writable<InitResult> = writable();

	let {
		disabled,
		variant,
		size,
		init
	}: {
		disabled: boolean;
		variant: VariantProps<typeof toggleVariants>['variant'];
		size: VariantProps<typeof toggleVariants>['size'];
		init: InitFunction;
	} = getContext('toggle-group');
</script>

<button
	{disabled}
	aria-pressed={$isPressed}
	data-state={$isPressed ? 'on' : 'off'}
	aria-label={ariaLabel}
	data-disabled={disabled ? true : undefined}
	tabindex={focused ? 0 : -1}
	type="button"
	class={cn(
		'inline-flex h-10 items-center justify-center rounded-md bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground',
		toggleVariants({ variant, size, className })
	)}
	on:focusin={() => (focused = true)}
	on:focusout={() => (focused = false)}
	on:click={$initResult?.toggleItem}
	use:init={[value, isPressed, initResult]}
>
	<slot />
</button>
