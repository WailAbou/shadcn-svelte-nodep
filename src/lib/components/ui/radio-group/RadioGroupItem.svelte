<script lang="ts">
	import { cn } from '$lib/helpers/utils';
	import { InitResult, type InitFunction } from '$lib/helpers/types';
	import { Circle } from 'lucide-svelte';
	import { getContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	let className: string | undefined | null = undefined;
	export { className as class };
	export let value: string;
	export let id: string | undefined = undefined;
	export let disabled: boolean = false;

	let initResult: InitResult = new InitResult();
	let checked: Writable<boolean> = writable(false);
	let { disabled: allDisabled, defaultValue, init }: { disabled: boolean; defaultValue: string; init: InitFunction } = getContext('radio-group');

	disabled = disabled || allDisabled;
</script>

<button
	use:init={[checked, value, initResult]}
	on:click={initResult.toggleItem}
	{id}
	{disabled}
	{value}
	tabindex={$checked || (initResult?.index == 0 && !defaultValue) ? 0 : -1}
	aria-checked={$checked}
	data-state={$checked ? 'checked' : 'unchecked'}
	type="button"
	role="radio"
	class={cn(
		'aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
		className
	)}
>
	{#if $checked}
		<span data-state="checked" class="flex items-center justify-center">
			<Circle class="h-2.5 w-2.5 fill-current text-current" />
		</span>
	{/if}
</button>
<input checked={$checked} {disabled} {value} aria-hidden="true" tabindex="-1" type="radio" class="pointer-events-none absolute !m-0 h-4 w-4 opacity-0" />
