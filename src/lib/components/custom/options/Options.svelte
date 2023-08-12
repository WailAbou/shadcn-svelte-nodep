<script lang="ts">
	import { Separator } from '$components/ui/separator';
	import { ChevronDown, ChevronUp } from 'lucide-svelte';
	import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '$components/ui/collapsible';
	import { Button } from '$components/ui/button';

	let isOpen: boolean = false;
</script>

<Collapsible on:openChange={({ detail: open }) => (isOpen = open)}>
	<CollapsibleTrigger class="w-full">
		<Button variant="outline" class="w-full">
			<h4 class="text-sm font-semibold">
				Options
				{#if isOpen}
					<ChevronUp class="inline-block h-4 w-4" />
				{:else}
					<ChevronDown class="inline-block h-4 w-4" />
				{/if}
			</h4>
		</Button>
	</CollapsibleTrigger>
	<CollapsibleContent class="bg-primary-foreground bg-opacity-80 p-4">
		<div class="grid grid-cols-1 gap-2 md:grid-cols-2">
			<slot />
		</div>
	</CollapsibleContent>
	<Separator class="my-5" />
</Collapsible>
