<script lang="ts">
	import * as ex from "$components/examples";
	import { Settings } from "$components/custom/settings";
	import { SvelteCode } from "$components/custom/svelte-code";
	import { Separator } from "$components/ui/separator";
	
	const examples = [
		ex.AccordionExample, ex.AlertExample, ex.AlertDialogExample, ex.ButtonExample,
		ex.CheckboxExample, ex.CollapsibleExample, ex.DialogExample, ex.InputExample,
		ex.LabelExample, ex.LinkExample, ex.RadioGroupExample, ex.SeparatorExample,
		ex.SwitchExample, ex.TextareaExample
	];

	const codes = [
		ex.AccordionExampleCode, ex.AlertExampleCode, ex.AlertDialogExampleCode, ex.ButtonExampleCode,
		ex.CheckboxExampleCode, ex.CollapsibleExampleCode, ex.DialogExampleCode, ex.InputExampleCode,
		ex.LabelExampleCode, ex.LinkExampleCode, ex.RadioGroupExampleCode, ex.SeparatorExampleCode,
		ex.SwitchExampleCode, ex.TextareaExampleCode
	];

	function formatTitle(type: string) {
		return type?.replace(/^Proxy<(.+)Example>$/, '$1');
	}
</script>

<div class="container mx-auto py-10">
	<Settings let:codeMode>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			{#each examples as Example, i}
				<div class="container mx-auto border rounded-md p-10">
					<h1 class="font-bold">{formatTitle(Example.name)}</h1>
					<Separator class="my-4" />
					<SvelteCode code={codes[i]} {codeMode} >
						<Example />
					</SvelteCode>
				</div>
			{/each}
		</div>
	</Settings>
</div>