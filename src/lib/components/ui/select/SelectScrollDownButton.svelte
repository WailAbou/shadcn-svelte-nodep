<script lang="ts">
	import { ChevronDown } from 'lucide-svelte';
	import type { Writable } from 'svelte/store';
	import { scrollOnHover } from './select';

	export let selectScrollView: HTMLElement;
	export let scrollAmount: Writable<number>;
</script>

{#if selectScrollView?.scrollHeight >= 350 && $scrollAmount < selectScrollView?.scrollHeight - 350}
	<div use:scrollOnHover={[selectScrollView, 'down']} aria-hidden="true" class="flex cursor-default items-center justify-center py-1" style="flex-shrink: 0;">
		<ChevronDown class="h-4 w-4" />
	</div>
{/if}
