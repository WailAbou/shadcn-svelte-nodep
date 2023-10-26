<script lang="ts">
	import { cn } from '$lib/helpers/utils';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { slide } from 'svelte/transition';

	let className: string | undefined | null = undefined;
	export { className as class };

	let { isOpen }: { isOpen: Writable<boolean> } = getContext('accordion-item');
</script>

{#if $isOpen}
	<div class={cn('overflow-hidden text-sm', className)} transition:slide>
		<div class="pb-4 pt-0">
			<slot />
		</div>
	</div>
{/if}
