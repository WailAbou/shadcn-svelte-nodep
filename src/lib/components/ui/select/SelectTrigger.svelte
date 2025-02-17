<script lang="ts">
	import { clickOutside } from '$lib/helpers/actions';
	import type { Direction } from '$lib/helpers/types';
	import { cn } from '$lib/helpers/utils';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	let className: string | undefined | null = undefined;
	export { className as class };

	let { selectTrigger, isOpen, disabled, selectContentUuid, dir }: { selectTrigger: Writable<HTMLElement>; isOpen: Writable<boolean>; disabled: boolean; selectContentUuid: string; dir: Direction } =
		getContext('select');
</script>

<button
	{disabled}
	bind:this={$selectTrigger}
	on:click={() => ($isOpen = !$isOpen)}
	use:clickOutside={[() => isOpen.set(false)]}
	aria-controls={selectContentUuid}
	{dir}
	type="button"
	role="combobox"
	aria-expanded="false"
	aria-autocomplete="none"
	data-state={$isOpen ? 'open' : 'closed'}
	data-disabled={disabled ? true : undefined}
	class={cn(
		'flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
		className
	)}
>
	<slot />
</button>
