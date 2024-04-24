<script lang="ts">
	import { cn } from '$lib/helpers/utils';
	import { ChevronRight } from 'lucide-svelte';

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<li role="presentation" aria-hidden="true" class={cn('[&amp;>svg]:size-3.5', className)}>
	{#if $$slots.default}
		<slot />
	{:else}
		<ChevronRight class="h-4 w-4" />
	{/if}
</li>
