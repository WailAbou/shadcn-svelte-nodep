<script lang="ts">
	import { cn } from '$lib/utils';
	import { Check } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{ checkedChange: boolean }>();

	let className: string | undefined | null = undefined;
	export { className as class };

	export let id: string | undefined = undefined;
	export let defaultChecked: boolean = false;
	export let disabled: boolean | undefined = undefined;
	export let required: boolean | undefined = undefined;

	let checked: boolean = defaultChecked;

	function toggle() {
		checked = !checked;
		dispatch('checkedChange', checked);
	}

	function preventEnter(event: KeyboardEvent) {
		if (event.key === 'Enter') event.preventDefault();
	}
</script>

<button
	on:click={toggle}
	on:keydown={preventEnter}
	{id}
	{disabled}
	aria-checked={checked}
	type="button"
	role="checkbox"
	value="on"
	class={cn(
		'peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 aria-checked:bg-primary aria-checked:text-primary-foreground',
		className
	)}
>
	{#if checked}
		<Check class="h-4 w-4" />
	{/if}
</button>
<input {disabled} {required} bind:checked aria-hidden="true" tabindex="-1" type="checkbox" value="on" class="pointer-events-none absolute !m-0 h-4 w-4 opacity-0" />
