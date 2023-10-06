<script lang="ts">
	import { clickOutside } from '$lib/helpers/actions';
	import { cn } from '$lib/helpers/utils';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	let className: string | undefined | null = undefined;
	export { className as class };

	let { selectTrigger, isOpen }: { selectTrigger: Writable<HTMLElement>; isOpen: Writable<boolean> } = getContext('select');
</script>

<button
	use:clickOutside={{ callback: () => isOpen.set(false) }}
	bind:this={$selectTrigger}
	on:mousedown={() => ($isOpen = !$isOpen)}
	aria-controls="radix-:r4l:"
	type="button"
	role="combobox"
	aria-expanded="false"
	aria-autocomplete="none"
	dir="ltr"
	data-state="closed"
	class={cn(
		'flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
		className
	)}
>
	<slot />
</button>
