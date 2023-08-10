<script lang="ts">
	import { ChevronDown } from "lucide-svelte";
	import { cn } from "$lib/utils";
	import { getContext } from "svelte";
	import type { Writable } from "svelte/store";

	let className: string | undefined | null = undefined;
	export { className as class };

    let toggleItem: VoidFunction;
	let accordionTrigger: HTMLButtonElement;
	let { expandedStore, value }: { expandedStore: Writable<boolean>, value: string } = getContext('accordion-item');
	let { init }: { init: (expandedStore: Writable<boolean>, targetValue: string, accordionTrigger: HTMLButtonElement) => VoidFunction } = getContext('accordion');

    $: if (accordionTrigger) toggleItem = init(expandedStore, value, accordionTrigger);    
</script>

<h3 class="flex">
	<button bind:this={accordionTrigger} type="button" class="{cn("flex flex-1 items-center justify-between py-4 font-medium hover:underline", className)}" 
		on:click={toggleItem}>
		<slot />
		<ChevronDown class="h-4 w-4 transition-transform {$expandedStore ? 'rotate-180' : ''}" />
	</button>
</h3>