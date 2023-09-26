<script lang="ts">
	import { cn } from '$lib/helpers/utils';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	let className: string | undefined | null = undefined;
	export { className as class };
	export let value: string;
	export let disabled: boolean = false;

	let selectedValueStore: Writable<string> = getContext('tabs');
	let values: Writable<string[]> = getContext('tabs-list');
	$values.push(value);

	$: isActive = $selectedValueStore == value;
</script>

<button
	type="button"
	role="tab"
	aria-selected="true"
	data-state={isActive ? 'active' : 'inactive'}
	tabindex={isActive ? 0 : -1}
	data-orientation="horizontal"
	class={cn(
		'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
		className
	)}
	on:click={() => ($selectedValueStore = value)}
	{disabled}
>
	<slot />
</button>
