<script lang="ts">
	import { cn } from '$lib/utils';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	let className: string | undefined | null = undefined;
	export { className as class };

	let { openStore, disabledStore }: { openStore: Writable<boolean>; disabledStore: Writable<boolean> } = getContext('collapsible');
</script>

<button disabled={$disabledStore} class={cn('disabled:opacity-50 disabled:pointer-events-none', className)} aria-expanded={$openStore} on:click={() => ($openStore = !$openStore)}>
	<slot />
</button>
