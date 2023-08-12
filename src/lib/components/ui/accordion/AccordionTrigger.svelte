<script lang="ts">
	import { ChevronDown } from 'lucide-svelte';
	import { cn, type InitFunction, type InitResult } from '$lib/utils';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	let className: string | undefined | null = undefined;
	export { className as class };

	let initResult: InitResult;
	const onInit = (result: InitResult) => (initResult = result);
	let { expandedStore, value }: { expandedStore: Writable<boolean>; value: string } = getContext('accordion-item');
	let { init }: { init: InitFunction<boolean> } = getContext('accordion');
</script>

<h3 class="flex">
	<button
		use:init={{ store: expandedStore, value, onInit }}
		type="button"
		class={cn('flex flex-1 items-center justify-between py-4 font-medium hover:underline', className)}
		on:click={initResult.toggleItem}
	>
		<slot />
		<ChevronDown class="h-4 w-4 transition-transform {$expandedStore ? 'rotate-180' : ''}" />
	</button>
</h3>
