<script>
	import { AccordionExample, ButtonExample, SeparatorExample, LabelExample, CheckboxExample } from "$components/examples";
	const examples = [AccordionExample, SeparatorExample, ButtonExample, LabelExample, CheckboxExample];
</script>

<div class="container mx-auto py-10 grid grid-cols-1 md:grid-cols-2 gap-4">
	{#each examples as example}
		<div class="container mx-auto border rounded-md p-10">
			<svelte:component this={example} />
		</div>
	{/each}
</div>