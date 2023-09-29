<script lang="ts">
	import { cn } from '$lib/helpers/utils';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	let className: string | undefined | null = undefined;
	export { className as class };

	let { open, disabled }: { open: Writable<boolean>; disabled: boolean } = getContext('collapsible');
</script>

<button {disabled} class={cn('disabled:pointer-events-none disabled:opacity-50', className)} aria-expanded={$open} on:click={() => ($open = !$open)}>
	<slot />
</button>
