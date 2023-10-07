<script lang="ts">
	import { clickOutside } from '$lib/helpers/actions';
	import { cn } from '$lib/helpers/utils';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	let className: string | undefined | null = undefined;
	export { className as class };

	let {
		selectTrigger,
		isOpen,
		selectedValue,
		disabled,
		selectContentUuid,
		dir
	}: { selectTrigger: Writable<HTMLElement>; isOpen: Writable<boolean>; selectedValue: Writable<string>; disabled: boolean; selectContentUuid: string; dir: string } = getContext('select');
</script>

<button
	{disabled}
	use:clickOutside={[() => isOpen.set(false)]}
	bind:this={$selectTrigger}
	on:mousedown={() => ($isOpen = !$isOpen)}
	aria-controls={selectContentUuid}
	{dir}
	type="button"
	role="combobox"
	aria-expanded="false"
	aria-autocomplete="none"
	data-state={$isOpen ? 'open' : 'closed'}
	data-disabled={disabled ? true : undefined}
	data-placeholder={!$selectedValue ? true : undefined}
	class={cn(
		'flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
		className
	)}
>
	<slot />
</button>
