<script lang="ts">
	import { ScrollArea, type ScrollAreaType } from '$components/ui/scroll-area';
	import { Separator } from '$components/ui/separator';
	import { Options } from '$components/custom/options';
	import { Button } from '$components/ui/button';

	const tagsFull = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);
	const tagsSubset = tagsFull.slice(0, 5);

	let index: number = 0;
	let types: ScrollAreaType[] = ['hover', 'auto', 'always', 'scroll'];

	$: type = types[index];
</script>

<Options>
	<Button on:click={() => (index = 0)}>Reset</Button>
	<Button on:click={() => (index = (index + 1) % types.length)}>Type: {types[index]}</Button>
</Options>

<div class="grid grid-cols-2 gap-4">
	<ScrollArea class="h-72 w-48 rounded-md border" {type}>
		<div class="p-4">
			<h4 class="mb-4 text-sm font-medium leading-none">Tags</h4>
			{#each tagsFull as tag}
				<div class="text-sm">{tag}</div>
				<Separator class="my-2" />
			{/each}
		</div>
	</ScrollArea>

	<ScrollArea class="h-72 w-48 rounded-md border" {type}>
		<div class="p-4">
			<h4 class="mb-4 text-sm font-medium leading-none">Tags</h4>
			{#each tagsSubset as tag}
				<div class="text-sm">{tag}</div>
				<Separator class="my-2" />
			{/each}
		</div>
	</ScrollArea>
</div>
