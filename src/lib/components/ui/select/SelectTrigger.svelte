<script lang="ts">
	import { clickOutside, keyDown } from '$lib/helpers/actions';
	import type { Direction } from '$lib/helpers/types';
	import { cn } from '$lib/helpers/utils';
	import { getContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	let className: string | undefined | null = undefined;
	export { className as class };

	let focused: Writable<boolean> = writable(false);

	let { selectTrigger, isOpen, disabled, selectContentUuid, dir }: { selectTrigger: Writable<HTMLElement>; isOpen: Writable<boolean>; disabled: boolean; selectContentUuid: string; dir: Direction } =
		getContext('select');

	$: !$isOpen && $selectTrigger?.focus();
</script>

<button
	bind:this={$selectTrigger}
	on:click={() => ($isOpen = !$isOpen)}
	on:focusin={() => focused.set(true)}
	on:focusout={() => focused.set(false)}
	use:clickOutside={[() => isOpen.set(false)]}
	use:keyDown={[focused, () => isOpen.set(true), ['ArrowUp', 'ArrowDown']]}
	{disabled}
	{dir}
	aria-controls={selectContentUuid}
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
