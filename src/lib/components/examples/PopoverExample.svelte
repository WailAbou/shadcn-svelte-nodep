<script lang="ts">
	import { Popover, PopoverContent, PopoverTrigger } from '$components/ui/popover';
	import { Button } from '$components/ui/button';
	import { Input } from '$components/ui/input';
	import { Label } from '$components/ui/label';
	import type { Side } from '$lib/helpers/types';

	let sides: Side[] = ['bottom', 'top', 'left', 'right'];
</script>

<div class="grid grid-cols-1 gap-4 lg:grid-cols-4">
	{#each sides as side}
		<Popover>
			<PopoverTrigger>
				<Button variant="outline">Popover {side}</Button>
			</PopoverTrigger>
			<PopoverContent {side} class="w-80">
				<div class="grid gap-4">
					<div class="space-y-2">
						<h4 class="font-medium leading-none">Dimensions</h4>
						<p class="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
					</div>
					<div class="grid gap-2">
						<div class="grid grid-cols-3 items-center gap-4">
							<Label htmlFor="width">Width</Label>
							<Input id="width" defaultValue="100%" class="col-span-2 h-8" />
						</div>
						<div class="grid grid-cols-3 items-center gap-4">
							<Label htmlFor="maxWidth">Max. width</Label>
							<Input id="maxWidth" defaultValue="300px" class="col-span-2 h-8" />
						</div>
						<div class="grid grid-cols-3 items-center gap-4">
							<Label htmlFor="height">Height</Label>
							<Input id="height" defaultValue="25px" class="col-span-2 h-8" />
						</div>
						<div class="grid grid-cols-3 items-center gap-4">
							<Label htmlFor="maxHeight">Max. height</Label>
							<Input id="maxHeight" defaultValue="none" class="col-span-2 h-8" />
						</div>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	{/each}
</div>
