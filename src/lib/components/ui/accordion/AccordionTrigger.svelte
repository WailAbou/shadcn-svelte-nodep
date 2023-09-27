<script lang="ts">
	import { ChevronDown } from 'lucide-svelte';
	import { cn } from '$lib/helpers/utils';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { InitResult, type InitFunction } from '$lib/helpers/types';

	let className: string | undefined | null = undefined;
	export { className as class };

	let initResult: InitResult = new InitResult();
	let { expandedStore, value }: { expandedStore: Writable<boolean>; value: string } = getContext('accordion-item');
	let { init }: { init: InitFunction<boolean> } = getContext('accordion');
</script>

<h3 class="flex">
	<button
		use:init={{ store: expandedStore, value, initResult }}
		on:click={initResult.toggleItem}
		type="button"
		class={cn('flex flex-1 items-center justify-between py-4 font-medium hover:underline', className)}
	>
		<slot />
		<ChevronDown class="h-4 w-4 transition-transform {$expandedStore ? 'rotate-180' : ''}" />
	</button>
</h3>
