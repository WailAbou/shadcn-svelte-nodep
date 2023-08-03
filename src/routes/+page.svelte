<script lang="ts">
	import * as ex from "$components/examples";
	import Settings from "$lib/components/Settings.svelte";
	import Code from "$lib/components/Code.svelte";
	
	const examples = [
		ex.AccordionExample, ex.AlertExample, ex.AlertDialogExample, ex.ButtonExample, ex.CheckboxExample, ex.CollapsibleExample, ex.DialogExample,
		ex.InputExample, ex.LabelExample, ex.LinkExample, ex.RadioGroupExample, ex.SeparatorExample, ex.SwitchExample, ex.TextareaExample
	];

	const codes: string[] = [
		ex.AccordionExampleCode, ex.AlertExampleCode, ex.AlertDialogExampleCode, ex.ButtonExampleCode, ex.CheckboxExampleCode,
		ex.CollapsibleExampleCode, ex.DialogExampleCode, ex.InputExampleCode, ex.LabelExampleCode, ex.LinkExampleCode,
		ex.RadioGroupExampleCode, ex.SeparatorExampleCode, ex.SwitchExampleCode, ex.TextareaExampleCode
	];
</script>

<div class="container mx-auto py-10">
	<Settings>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			{#each examples as Example, i}
				<div class="container mx-auto border rounded-md p-10">
					<Code code={codes[i]} >
						<Example />
					</Code>
				</div>
			{/each}
		</div>
	</Settings>
</div>