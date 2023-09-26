<script lang="ts">
	import { InitResult, type InitFunction } from '$lib/helpers/types';
	import { cn } from '$lib/helpers/utils';
	import { getContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	let className: string | undefined | null = undefined;
	export { className as class };
	export let value: string;
	export let disabled: boolean = false;

	let initResult: InitResult = new InitResult();
	let { selectedValueStore }: { selectedValueStore: Writable<string> } = getContext('tabs');
	let init: InitFunction<boolean> = getContext('tabs-list');
	let activeStore: Writable<boolean> = writable($selectedValueStore == value);
</script>

<button
	use:init={{ store: activeStore, value, initResult }}
	on:click={initResult.toggleItem}
	type="button"
	role="tab"
	aria-selected="true"
	data-state={$activeStore ? 'active' : 'inactive'}
	tabindex={$activeStore ? 0 : -1}
	data-orientation="horizontal"
	class={cn(
		'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
		className
	)}
	{disabled}
	{value}
>
	<slot />
</button>
