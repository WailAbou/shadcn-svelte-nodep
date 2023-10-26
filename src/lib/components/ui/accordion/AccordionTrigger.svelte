<script lang="ts">
	import { ChevronDown } from 'lucide-svelte';
	import { cn } from '$lib/helpers/utils';
	import { getContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import type { InitResult, InitFunction } from '$lib/helpers/types';

	let className: string | undefined | null = undefined;
	export { className as class };

	let initResult: Writable<InitResult> = writable();
	let { isOpen, value }: { isOpen: Writable<boolean>; value: string } = getContext('accordion-item');
	let { init }: { init: InitFunction } = getContext('accordion');
</script>

<h3 class="flex">
	<button use:init={[value, isOpen, initResult]} on:click={$initResult?.toggleItem} type="button" class={cn('flex flex-1 items-center justify-between py-4 font-medium hover:underline', className)}>
		<slot />
		<ChevronDown class="h-4 w-4 transition-transform {$isOpen ? 'rotate-180' : ''}" />
	</button>
</h3>
