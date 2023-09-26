<script lang="ts">
	import { cn } from '$lib/helpers/utils';
	import type { VariantProps } from 'class-variance-authority';
	import { createEventDispatcher } from 'svelte';
	import { toggleVariants } from './toggleVariants';

	const dispatch = createEventDispatcher<{ pressedChange: boolean }>();

	let className: string | undefined | null = undefined;
	export { className as class };
	export let ariaLabel: string | undefined = undefined;
	export let defaultPressed: boolean = false;
	export let pressed: boolean = false;
	export let disabled: boolean = false;
	export let variant: VariantProps<typeof toggleVariants>['variant'] = 'default';
	export let size: VariantProps<typeof toggleVariants>['size'] = 'default';

	pressed = defaultPressed;
	$: dispatch('pressedChange', pressed);
</script>

<button
	on:click={() => (pressed = !pressed)}
	type="button"
	aria-pressed={pressed}
	data-state={pressed ? 'on' : 'off'}
	aria-label={ariaLabel}
	{disabled}
	data-disabled={disabled ? true : undefined}
	class={cn(
		'inline-flex h-10 items-center justify-center rounded-md bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground',
		toggleVariants({ variant, size, className })
	)}
>
	<slot />
</button>
