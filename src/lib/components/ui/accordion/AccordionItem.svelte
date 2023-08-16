<script lang="ts">
	import { cn } from '$lib/helpers/utils';
	import { getContext, setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	let className: string | undefined | null = undefined;
	export { className as class };
	export let value: string;
	export let disabled: boolean = false;

	let expandedStore: Writable<boolean> = writable(false);
	let { disabled: allDisabled }: { disabled: boolean } = getContext('accordion');
	disabled = disabled || allDisabled;

	setContext('accordion-item', { expandedStore, value });
</script>

<div aria-disabled={disabled} class={cn('border-b aria-disabled:pointer-events-none aria-disabled:opacity-50', className)}>
	<slot />
</div>
