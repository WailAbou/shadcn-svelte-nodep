<script lang="ts">
	import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '$components/ui/tooltip';
	import { Button } from '$components/ui/button';
	import type { Side } from '$lib/helpers/types';

	let sides: Side[] = ['bottom', 'top', 'left', 'right'];
</script>

<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
	{#each sides as side}
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<Button variant="outline">Tooltip {side}</Button>
				</TooltipTrigger>
				<TooltipContent {side}>
					<p>Add to library</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	{/each}
</div>
