<script lang="ts">
	import { ChevronUp } from 'lucide-svelte';
	import type { Writable } from 'svelte/store';
	import { scrollOnHover } from './select';

	export let selectScrollView: HTMLElement;
	export let scrollAmount: Writable<number>;
</script>

{#if $scrollAmount > 0}
	<div use:scrollOnHover={[selectScrollView, 'up']} aria-hidden="true" class="flex cursor-default items-center justify-center py-1" style="flex-shrink: 0;">
		<ChevronUp class="h-4 w-4" />
	</div>
{/if}
