<script lang="ts">
	import * as ex from "$components/examples";
	const examples = [ex.AccordionExample, ex.AlertExample, ex.ButtonExample, ex.CheckboxExample, ex.CollapsibleExample, ex.LabelExample, ex.SeparatorExample];
</script>

<div class="container mx-auto py-10 grid grid-cols-1 md:grid-cols-2 gap-4">
	{#each examples as Example}
		<div class="container mx-auto border rounded-md p-10">
			<Example />
		</div>
	{/each}
</div>