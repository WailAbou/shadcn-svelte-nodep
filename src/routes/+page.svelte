<script lang="ts">
	import * as ex from "$components/examples";
	import Settings from "$lib/components/Settings.svelte";
	const examples = [ex.AccordionExample, ex.AlertExample, ex.ButtonExample, ex.CheckboxExample, ex.CollapsibleExample, ex.InputExample, ex.LabelExample, ex.LinkExample, ex.SeparatorExample, ex.SwitchExample, ex.TextareaExample];
</script>

<div class="container mx-auto py-10">
	<Settings></Settings>
	<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
		{#each examples as Example}
			<div class="container mx-auto border rounded-md p-10">
				<Example />
			</div>
		{/each}
	</div>
</div>