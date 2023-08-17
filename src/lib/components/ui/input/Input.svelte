<script lang="ts">
	import { cn } from '$lib/helpers/utils';
	import type { HTMLInputTypeAttribute } from 'svelte/elements';

	let className: string | undefined | null = undefined;
	export { className as class };

	export let type: HTMLInputTypeAttribute = 'text';
	export let placeholder: string | undefined = undefined;
	export let id: string | undefined = undefined;
	export let disabled: boolean = false;
</script>

<input
	{...$$restProps}
	{placeholder}
	{disabled}
	{type}
	{id}
	class={cn(
		'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
		className
	)}
/>
