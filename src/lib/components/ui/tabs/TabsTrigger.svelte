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
	let isActive: Writable<boolean> = writable(false);
	let init: InitFunction = getContext('tabs-list');
</script>

<button
	use:init={[value, isActive, initResult]}
	on:click={initResult.toggleItem}
	type="button"
	role="tab"
	aria-selected="true"
	data-state={$isActive ? 'active' : 'inactive'}
	tabindex={$isActive ? 0 : -1}
	data-orientation="horizontal"
	class={cn(
		'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
		className
	)}
	{disabled}
>
	<slot />
</button>
