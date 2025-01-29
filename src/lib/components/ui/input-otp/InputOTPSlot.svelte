<script lang="ts">
	import type { InitFunction, InitResult } from '$lib/helpers/types';
	import { cn } from '$lib/helpers/utils';
	import { getContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	let className: string | undefined | null = undefined;
	export { className as class };

	export let index: number | undefined = undefined;

	let value: Writable<string> = writable('');
	let selected: Writable<boolean> = writable(false);
	let initResult: Writable<InitResult> = writable();

	let { init }: { init: InitFunction } = getContext('input-otp');
</script>

<div
	use:init={[value, selected, initResult]}
	on:click={$initResult?.toggleItem}
	class={cn('relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md', className)}
>
	{#if $selected}
		<div class="pointer-events-none absolute inset-0 flex items-center justify-center"><div class="h-4 w-px animate-caret-blink bg-foreground duration-1000"></div></div>
	{/if}
	{$value}
</div>
